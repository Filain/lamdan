import { NextFunction, Request, Response } from 'express';

import SuccessHandler from '../handlers/success.handler';
import { IOrderList } from '../interfases/order.interfaces';
import { orderService, OrderService } from '../services/order.service';

// interface CustomRequest extends Request {
//     user?: { userId: string; userRole: string };
// }

class OrderController {
    constructor(private orderService: OrderService) {}

    getAll = async (
        req: Request,
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
}

export const orderController = new OrderController(orderService);
