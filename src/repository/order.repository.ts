import { IOrder, IOrderList } from '../interfases/order.interfaces';
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
            .limit(limit)
            .exec();
        const totalOrders = await ordersModel.countDocuments();
        const total = Math.ceil(totalOrders / limit);

        return { data: orderData, total };
    }

    async post(dto: IOrder): Promise<IOrder> {
        return await ordersModel.create(dto);
    }

    async getById(id: string): Promise<IOrder | null> {
        return await ordersModel.findById(id).exec();
    }

    async delete(id: string): Promise<IOrder | null> {
        return await ordersModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, dto: IOrder): Promise<IOrder | null> {
        return await ordersModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
    }
}

export const orderRepository = new OrderRepository();
