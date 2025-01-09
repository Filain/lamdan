import { NextFunction, Request, Response } from 'express';

import { ICreateUserRequestBody } from '../interfases/user.interfaces';
import SuccessHandler from '../handlers/success.handler';
import { authService, AuthService } from '../services/auth.service';
import { BaseError } from '../errors/base.error';

class AuthController {
    constructor(private authService: AuthService) {}

    registerUser = async (
        req: Request,
        res: Response<ICreateUserRequestBody | string>,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const user = await this.authService.registerUser(req.body);
            if (user) {
                SuccessHandler.ok(res, user);
            }
        } catch (err) {
            next(err);
        }
    };
    test = (_: Request, res: Response, next: NextFunction): void => {
        try {
            this.authService.test();

            SuccessHandler.ok(res, 'test');
        } catch (err) {
            res.status((<BaseError>err)?.httpCode || 500).send('sdffghjk');
            next(err);
        }
    };
}

export const authController = new AuthController(authService);
