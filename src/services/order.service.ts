import status from 'http-status';

import { BaseError } from '../errors/base.error';
import {
    orderRepository,
    OrderRepository,
} from '../repository/order.repository';
import { IOrder, IOrderList } from '../interfases/order.interfaces';
// import { userRepository, UserRepository } from '../repository/user.repository';

export class OrderService {
    constructor(
        private orderRepository: OrderRepository,
        // private userRepository: UserRepository,
    ) {}

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

    async post(dto: IOrder): Promise<IOrder> {
        const order = await this.orderRepository.post(dto);
        if (!order._id) {
            throw new BaseError(
                'Order not created',
                'post.OrderService',
                status.UNPROCESSABLE_ENTITY,
                'Server error',
            );
        }
        return order;
    }

    async getById(id: string): Promise<IOrder> {
        const order = await this.orderRepository.getById(id);
        if (!order) {
            throw new BaseError(
                'Order not found',
                'getById.OrderService',
                status.CONFLICT,
            );
        }
        return order;
    }

    async delete(id: string): Promise<IOrder | null> {
        const deletedOrder = await this.orderRepository.delete(id);
        if (!deletedOrder) {
            throw new BaseError(
                'Order is not deleted',
                'delete.OrderService',
                status.UNPROCESSABLE_ENTITY,
            );
        }
        return deletedOrder;

        // const order = await this.orderRepository.getById(id);
        // if (!order) {
        //     throw new BaseError(
        //         'Order not found',
        //         'deleteById.OrderService',
        //         status.CONFLICT,
        //     );
        // }
        // return await this.orderRepository.delete(id);
    }

    async update(id: string, dto: IOrder): Promise<IOrder> {
        const updatedOrder = await this.orderRepository.update(id, dto);
        if (!updatedOrder) {
            throw new BaseError(
                'Order is not updated',
                'update.OrderService',
                status.UNPROCESSABLE_ENTITY,
            );
        }
        return updatedOrder;
    }
}

export const orderService = new OrderService(orderRepository);
