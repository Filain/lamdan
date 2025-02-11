import status from 'http-status';

import { BaseError } from '../errors/base.error';
import {
    orderRepository,
    OrderRepository,
} from '../repository/order.repository';
import { IOrderList } from '../interfases/order.interfaces';

export class OrderService {
    constructor(private orderRepository: OrderRepository) {}

    async getAll(
        page: number,
        limit: number,
        sort: string,
    ): Promise<IOrderList> {
        const orders = await this.orderRepository.getAll(page, limit, sort);
        if (!orders) {
            throw new BaseError(
                'Orders not found',
                'getAll.OrderService',
                status.CONFLICT,
            );
        }
        return orders;
    }
}

export const orderService = new OrderService(orderRepository);
