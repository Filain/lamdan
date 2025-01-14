import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Response } from 'express';

import { authRepository, AuthRepository } from '../repository/auth.repository';
import {
    AuthTokens,
    ICreateUserRequestBody,
    ILoginUserRequestBody,
    IUser,
    IUserResponse,
    TokenPayload,
} from '../interfases/user.interfaces';
import { BaseError } from '../errors/base.error';
import validateHash from '../libs/bcrypt/validateHash';
import { config } from '../config/config';
import createHash from '../libs/bcrypt/createHash';

export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async registerUser(userData: ICreateUserRequestBody): Promise<IUser> {
        const user = await this.authRepository.findUserByEmail(userData.email);
        if (user) {
            throw new BaseError(
                'Could not save in DB, already exists',
                'registerUser',
                status.CONFLICT,
            );
        }
        const hashPassword = await createHash(userData.password);
        return await this.authRepository.registerUser({
            ...userData,
            password: hashPassword,
        });
    }
    async login(
        response: Response<IUserResponse>,
        login: ILoginUserRequestBody,
    ): Promise<IUser> {
        const user = await this.authRepository.findUserByEmail(login.email);
        if (!user) {
            throw new BaseError(
                'User not found',
                'loginUser',
                status.NOT_FOUND,
            );
        }

        const isPasswordCorrect = await validateHash(
            login.password,
            user.password!,
        );
        if (!isPasswordCorrect) {
            throw new BaseError(
                'User not found',
                'loginUser',
                status.NOT_FOUND,
            );
        }
        const tokens = this.createTokens({
            uid: user._id.toString(),
            role: user.role,
        });
        this.setupCookies(response, tokens);

        return user;
    }

    logout(response: Response, accessToken: string | undefined) {
        if (!accessToken) {
            throw new BaseError(
                'User Logout failed',
                'AuthService.logout',
                status.NOT_FOUND,
            );
        }
        response.clearCookie('accessToken');
        response.clearCookie('refreshToken');
    }

    async refresh(response: Response, refresh: string) {
        if (!refresh) {
            throw new BaseError(
                'User Refresh failed',
                'AuthService.refresh',
                status.NOT_FOUND,
            );
        }
        const JWTdecoded = jwt.verify(refresh, config.jwt_secret);

        if (!this.isTokenPayload(JWTdecoded)) {
            throw new BaseError(
                'User Refresh failed',
                'AuthService.refresh',
                status.NOT_FOUND,
            );
        }

        const { exp, uid, role } = JWTdecoded;

        if (exp && exp * 1000 < Date.now()) {
            throw new BaseError(
                'User Refresh failed',
                'AuthService.refresh',
                status.NOT_FOUND,
            );
        }

        const tokens = this.createTokens({ uid, role });
        this.setupCookies(response, tokens);
    }

    private setupCookies(
        response: Response,
        {
            accessToken,
            refreshToken,
        }: { accessToken: string; refreshToken: string },
    ): void {
        const {
            cookie_access_expires,
            cookie_refresh_expires,
            cookie_sameSite,
            cookie_secure,
        } = config;

        const cookieAccessExpires = Date.now() + cookie_access_expires;
        const cookieRefreshExpires = Date.now() + cookie_refresh_expires;

        response.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            sameSite: this.parseSameSite(cookie_sameSite),
            secure: cookie_secure,
            expires: new Date(cookieRefreshExpires),
        });

        response.cookie('accessToken', accessToken, {
            httpOnly: true,
            sameSite: this.parseSameSite(cookie_sameSite),
            secure: cookie_secure,
            expires: new Date(cookieAccessExpires),
        });
    }

    private parseSameSite(sameSiteProperty: string) {
        const values = ['lax', 'strict', 'none'];

        return values.includes(sameSiteProperty as 'lax' | 'strict' | 'none')
            ? (sameSiteProperty as 'lax' | 'strict' | 'none')
            : 'strict';
    }

    private createTokens(data: { uid: string; role: string }): AuthTokens {
        const { uid, role } = data;
        const accessToken = jwt.sign({ uid, role }, config.jwt_secret, {
            expiresIn: config.jwt_access_expires,
        });

        const refreshToken = jwt.sign({ uid, role }, config.jwt_secret, {
            expiresIn: config.jwt_refresh_expires,
        });

        return { accessToken, refreshToken };
    }
    private isTokenPayload(
        decoded: string | JwtPayload,
    ): decoded is TokenPayload {
        return (
            typeof decoded !== 'string' &&
            'uid' in decoded &&
            'role' in decoded &&
            typeof decoded.uid === 'string' &&
            typeof decoded.role === 'string'
        );
    }
}

export const authService = new AuthService(authRepository);
