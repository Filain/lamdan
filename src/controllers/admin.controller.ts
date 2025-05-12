import { NextFunction, Request, Response } from 'express';

import SuccessHandler from '../handlers/success.handler';
import { IOrderList } from '../interfases/order.interfaces';
import {
    CustomQueryPaginatedRequest,
    CustomRequest,
    CustomRequestBody,
    CustomRequestParams,
} from '../interfases/req.interfaces';
import { adminService, AdminService } from '../services/admin.service';
import { ICreateAdminRequestBody } from '../interfases/admin.interfaces';

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
            const user = await this.adminService.banUser(
                req.params.userId,
                req.user?.userId,
            );
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
            console.log(order);
            if (order) {
                SuccessHandler.created(res, order);
            }
        } catch (err) {
            next(err);
        }
    };

    changePassword = async (
        req: CustomRequestBody<{ token: string; password: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.adminService.changePassword(
                req.body.token,
                req.body.password,
            );

            if (order) {
                SuccessHandler.ok(res, order);
            }
        } catch (err) {
            next(err);
        }
    };
    create = async (
        req: Request,
        res: Response<ICreateAdminRequestBody>,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const user = await this.adminService.create(req.body);
            if (user) {
                SuccessHandler.created(res, user);
            }
        } catch (err) {
            next(err);
        }
    };
}

export const adminController = new AdminController(adminService);
