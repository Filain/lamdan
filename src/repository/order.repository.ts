import { IOrderList } from '../interfases/order.interfaces';
import ordersModel from '../models/orders.model';

export class OrderRepository {
    async getAll(
        page: number,
        limit: number,
        sort: string,
    ): Promise<IOrderList> {
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const orderData = await ordersModel
            .find()
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);
        const totalOrders = await ordersModel.countDocuments();
        const total = Math.ceil(totalOrders / limit);

        return { data: orderData, total };
    }
}

export const orderRepository = new OrderRepository();
