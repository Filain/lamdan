import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { BaseError } from '../errors/base.error';
import { config } from '../config/config';
import { TokenPayload } from '../interfases/user.interfaces';

interface CustomRequest extends Request {
    user: { userId: string; userRole: string };
}

class AuthMiddleware {
    public async checkAccessToken(
        req: CustomRequest,
        _res: Response,
        next: NextFunction,
    ) {
        try {
            const { accessToken } = req.cookies;
            if (!accessToken) {
                throw new BaseError(
                    'Access token not found',
                    'AuthMiddleware.checkAccessToken',
                    status.UNAUTHORIZED,
                );
            }
            const JWTdecoded = jwt.verify(accessToken, config.jwt_secret);

            if (!this.isTokenPayload(JWTdecoded)) {
                throw new BaseError(
                    'Access token not found',
                    'AuthMiddleware.checkAccessToken',
                    status.UNAUTHORIZED,
                );
            }
            const { uid, role } = JWTdecoded;

            if (!req.user) {
                req.user = { userId: uid, userRole: role };
            }

            if (!req.user) {
                req.user = { userId: uid, userRole: role };
            }

            req.user.userId = uid;
            req.user.userRole = role;
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        _res: Response,
        next: NextFunction,
    ) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                throw new BaseError(
                    'Refresh token not found',
                    'AuthMiddleware.checkRefreshToken',
                    status.UNAUTHORIZED,
                );
            }
            const JWTdecoded = jwt.verify(refreshToken, config.jwt_secret);

            if (!this.isTokenPayload(JWTdecoded)) {
                throw new BaseError(
                    'Refresh token not found',
                    'AuthMiddleware.checkRefreshToken',
                    status.UNAUTHORIZED,
                );
            }
        } catch (e) {
            next(e);
        }
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

export const authMiddleware = new AuthMiddleware();
