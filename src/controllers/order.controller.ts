import { NextFunction, Response } from 'express';
import status from 'http-status';

import SuccessHandler from '../handlers/success.handler';
import { IOrder, IOrderList } from '../interfases/order.interfaces';
import { orderService, OrderService } from '../services/order.service';
import { BaseError } from '../errors/base.error';
import {
    CustomRequestBody,
    CustomQueryRequest,
    CustomRequestParams,
} from '../interfases/req.interfaces';

class OrderController {
    constructor(private orderService: OrderService) {}

    getAll = async (
        req: CustomQueryRequest,
        res: Response<IOrderList>,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const sort = (req.query.sort as string) || '-id';

            const orders = await this.orderService.getAll(page, limit, sort);

            if (orders) {
                SuccessHandler.created(res, orders);
            }
        } catch (err) {
            next(err);
        }
    };

    post = async (
        req: CustomRequestBody<IOrder>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            if (!req.user) {
                throw new BaseError(
                    'User not logged in or not found',
                    'OrderController.post',
                    status.NOT_FOUND,
                    'User not found',
                );
            }
            const orders = await this.orderService.post(req.body);
            if (orders) {
                SuccessHandler.created(res, orders);
            }
        } catch (err) {
            next(err);
        }
    };

    getById = async (
        req: CustomRequestParams<{ orderId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.orderService.getById(req.params.orderId);

            if (order) {
                SuccessHandler.created(res, order);
            }
        } catch (err) {
            next(err);
        }
    };

    delete = async (
        req: CustomRequestParams<{ orderId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.orderService.delete(req.params.orderId);
            if (order) {
                SuccessHandler.created(res, order);
            }
        } catch (err) {
            next(err);
        }
    };

    update = async (
        req: CustomRequestParams<{ orderId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.orderService.update(
                req.params.orderId,
                req.body,
            );
            if (order) {
                SuccessHandler.created(res, order);
            }
        } catch (err) {
            next(err);
        }
    };
}

export const orderController = new OrderController(orderService);
