import { NextFunction, Request, Response } from 'express';

import {
    ICreateUserRequestBody,
    ILoginUserRequestBody,
    IUserResponse,
} from '../interfases/user.interfaces';
import SuccessHandler from '../handlers/success.handler';
import { authService, AuthService } from '../services/auth.service';

class AuthController {
    constructor(private authService: AuthService) {}

    register = async (
        req: Request,
        res: Response<ICreateUserRequestBody>,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const user = await this.authService.registerUser(req.body);
            if (user) {
                SuccessHandler.created(res, { data: user });
            }
        } catch (err) {
            next(err);
        }
    };

    login = async (
        req: Request<ILoginUserRequestBody>,
        res: Response<IUserResponse>,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const user = await this.authService.login(res, req.body);
            if (user) {
                SuccessHandler.ok(res, { data: user });
            }
        } catch (err) {
            next(err);
        }
    };

    logout = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { accessToken } = req.cookies;
            this.authService.logout(res, accessToken);

            SuccessHandler.noContent(res);
        } catch (err) {
            next(err);
        }
    };

    refresh = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { refreshToken } = req.cookies;
            await this.authService.refresh(res, refreshToken);
            SuccessHandler.ok(res);
        } catch (err) {
            next(err);
        }
    };
}

export const authController = new AuthController(authService);
