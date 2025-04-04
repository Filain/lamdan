import { NextFunction, Response } from 'express';

import SuccessHandler from '../handlers/success.handler';
import { IOrderList } from '../interfases/order.interfaces';
import {
    CustomQueryPaginatedRequest,
    CustomRequest,
    CustomRequestParams,
    CustomRequestParamsBody,
} from '../interfases/req.interfaces';
import { adminService, AdminService } from '../services/admin.service';

class AdminController {
    constructor(private adminService: AdminService) {}

    getAll = async (
        req: CustomQueryPaginatedRequest,
        res: Response<IOrderList>,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const users = await this.adminService.getAll(req.query);

            if (users) {
                SuccessHandler.ok(res, users);
            }
        } catch (err) {
            next(err);
        }
    };

    getStatistics = async (
        _: CustomRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const statistics = await this.adminService.getStatistics();
            if (statistics) {
                SuccessHandler.ok(res, statistics);
            }
        } catch (err) {
            next(err);
        }
    };

    banUser = async (
        req: CustomRequestParams<{ userId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const user = await this.adminService.banUser(req.params.userId);
            if (user) {
                SuccessHandler.created(res, user);
            }
        } catch (err) {
            next(err);
        }
    };

    unbanUser = async (
        req: CustomRequestParams<{ userId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const user = await this.adminService.unbanUser(req.params.userId);
            if (user) {
                SuccessHandler.created(res, user);
            }
        } catch (err) {
            next(err);
        }
    };

    getActivationToken = async (
        req: CustomRequestParams<{ userId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.adminService.getActivationToken(
                req.params.userId,
            );
            if (order) {
                SuccessHandler.created(res, order);
            }
        } catch (err) {
            next(err);
        }
    };

    activate = async (
        req: CustomRequestParams<{ token: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.adminService.activate(req.params.token);
            if (order) {
                SuccessHandler.created(res, order);
            }
        } catch (err) {
            next(err);
        }
    };

    changePassword = async (
        req: CustomRequestParamsBody<{ userId: string }, { password: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.adminService.changePassword(
                req.params.userId,
                req.body.password,
            );
            if (order) {
                SuccessHandler.ok(res, order);
            }
        } catch (err) {
            next(err);
        }
    };
}

export const adminController = new AdminController(adminService);
