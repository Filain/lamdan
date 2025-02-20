import { NextFunction } from 'express';

import { userRepository } from '../repository/user.repository';
import { CustomRequest } from '../interfases/req.interfaces';
import { BaseError } from '../errors/base.error';

export function bannedMiddleware(
    req: CustomRequest,
    _res: Response,
    next: NextFunction,
) {
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

//
// class RoleMiddleware {
//     public isAdmin(
//         req: CustomRequest,
//         _res: Response,
//         next: NextFunction,
//     ): void {
//         try {
//             if (!req.user) {
//                 throw new BaseError(
//                     'User not logged in or not found',
//                     'OrderController.post',
//                     401,
//                     'User not found',
//                 );
//             }
//
//             if (req.user.userRole !== RoleEnum.ADMIN) {
//                 throw new BaseError(
//                     'Forbidden: insufficient permissions',
//                     'OrderController.post',
//                     403,
//                     'Forbidden: insufficient permissions',
//                 );
//             }
//
//             next();
//         } catch (e) {
//             next(e);
//         }
//     }
// }
//
// export const roleMiddleware = new RoleMiddleware();
