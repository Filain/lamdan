import { Response, NextFunction } from 'express';

import { CustomRequest } from '../interfases/req.interfaces';
import { userRepository } from '../repository/user.repository';
import { BaseError } from '../errors/base.error';

class BannedMiddleware {
    public isBanned(
        req: CustomRequest,
        _res: Response,
        next: NextFunction,
    ): void {
        if (!req.user) {
            return next(); // Якщо користувач не авторизований, пропускаємо перевірку
        }

        userRepository
            .getById(req.user.userId)
            .then(user => {
                if (user?.isBanned) {
                    throw new BaseError(
                        'User is Banned',
                        'bannedMiddleware',
                        403,
                        'Server error',
                    );
                }
                next();
            })
            .catch(next); // Автоматична передача помилки в Express
    }
}

export const bannedMiddleware = new BannedMiddleware();
