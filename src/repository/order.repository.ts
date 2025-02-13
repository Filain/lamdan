import { FilterQuery, SortOrder, Types } from 'mongoose';

import {
    IOrder,
    IOrderList,
    IOrderQuery,
} from '../interfases/order.interfaces';
import ordersModel from '../models/orders.model';

export class OrderRepository {
    async getAll(query: IOrderQuery, userId: string): Promise<IOrderList> {
        let page = parseInt(query?.page as string) || 1;
        let limit = parseInt(query?.limit as string) || 10;
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const filterObj: FilterQuery<IOrder> = {};
        // Додавання умов пошуку для кожного поля
        if (query.name) {
            filterObj.name = { $regex: query.name, $options: 'i' };
        }
        if (query.surname) {
            filterObj.surname = { $regex: query.surname, $options: 'i' };
        }
        if (query.email) {
            filterObj.email = { $regex: query.email, $options: 'i' };
        }
        if (query.phone) {
            filterObj.phone = { $regex: query.phone, $options: 'i' };
        }
        if (query.age) {
            filterObj.age = query.age; // або можна застосувати діапазон, якщо потрібно
        }
        if (query.course) {
            filterObj.course = { $regex: query.course, $options: 'i' };
        }
        if (query.course_format) {
            filterObj.course_format = {
                $regex: query.course_format,
                $options: 'i',
            };
        }
        if (query.course_type) {
            filterObj.course_type = {
                $regex: query.course_type,
                $options: 'i',
            };
        }
        if (query.status) {
            filterObj.status = { $regex: query.status, $options: 'i' };
        }
        if (query.group) {
            filterObj.group = query.group;
        }

        if (query.my === 'true') {
            filterObj.manager = userId;
        }

        // Динамічне сортування
        let sortField = query?.sort?.replace('-', '') || 'id'; // Вибір поля для сортування
        let sortOrder: SortOrder = query?.sort?.startsWith('-') ? -1 : 1; // Перевірка напрямку сортування
        const sort: { [key: string]: SortOrder } = { [sortField]: sortOrder };

        const orderData = await ordersModel
            .find(filterObj)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        const totalOrders = await ordersModel.countDocuments(filterObj);
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
    async addComment(
        id: string,
        commentId: Types.ObjectId | undefined,
    ): Promise<IOrder | null> {
        return await ordersModel
            .findByIdAndUpdate(
                id,
                { $push: { comment: commentId } }, // Додаємо коментар в масив
                { new: true }, // Повертаємо оновлений документ
            )
            .exec();
    }
}

export const orderRepository = new OrderRepository();
