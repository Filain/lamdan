import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';

import { BaseError } from '../errors/base.error';
import { config } from '../config/config';
import { TokenPayload } from '../interfases/user.interfaces';

interface CustomRequest extends Request {
    user?: { userId: string; userRole: string };
}

function isTokenPayload(decoded: string | JwtPayload): decoded is TokenPayload {
    return (
        typeof decoded !== 'string' &&
        'uid' in decoded &&
        'role' in decoded &&
        typeof decoded.uid === 'string' &&
        typeof decoded.role === 'string'
    );
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

            if (!isTokenPayload(JWTdecoded)) {
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
            next();
        } catch (e) {
            if (e instanceof TokenExpiredError) {
                // Обробка помилки закінчення терміну дії токена
                next(
                    new BaseError(
                        'Access token expired',
                        'AuthMiddleware.checkAccessToken',
                        status.UNAUTHORIZED,
                    ),
                );
                // Тут ви можете додати логіку для відправки запиту на оновлення токена (залежно від вашої реалізації)
            } else {
                // Обробка інших помилок верифікації токена (наприклад, неправильний підпис)
                next(
                    new BaseError(
                        'Invalid access token',
                        'AuthMiddleware.checkAccessToken',
                        status.FORBIDDEN,
                    ),
                );
            }
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
            if (!isTokenPayload(JWTdecoded)) {
                throw new BaseError(
                    'Refresh token not found',
                    'AuthMiddleware.checkRefreshToken',
                    status.UNAUTHORIZED,
                );
            }
            const currentTime = Math.floor(Date.now() / 1000);
            if (!JWTdecoded.exp) {
                throw new BaseError(
                    'Refresh token does not contain expiration time',
                    'AuthMiddleware.checkRefreshToken',
                    status.UNAUTHORIZED,
                );
            }

            if (JWTdecoded.exp < currentTime) {
                throw new BaseError(
                    'Refresh token expired',
                    'AuthMiddleware.checkRefreshToken',
                    status.UNAUTHORIZED,
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const authMiddleware = new AuthMiddleware();
