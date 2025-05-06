import { Response, NextFunction } from 'express';

import { BaseError } from '../errors/base.error';
import { RoleEnum } from '../enums/role.enum';
import { CustomRequest } from '../interfases/req.interfaces';

class RoleMiddleware {
    public isAdmin(
        req: CustomRequest,
        _res: Response,
        next: NextFunction,
    ): void {
        try {
            if (!req.user) {
                throw new BaseError(
                    'User not logged in or not found',
                    'OrderController.post',
                    401,
                    'User not found',
                );
            }

            if (req.user.userRole !== RoleEnum.ADMIN) {
                throw new BaseError(
                    'Forbidden: insufficient permissions',
                    'OrderController.post',
                    403,
                    'Forbidden: insufficient permissions',
                );
            }

            next();
        } catch (e) {
            next(e);
        }
    }
}

export const roleMiddleware = new RoleMiddleware();
