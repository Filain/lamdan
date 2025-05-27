import mongoose, { FilterQuery, SortOrder, Types } from 'mongoose';

import {
    IOrder,
    IOrderList,
    IOrderQuery,
    IOrderQueryExport,
} from '../interfases/order.interfaces';
import ordersModel from '../models/orders.model';
import { IStatistic } from '../interfases/user.interfaces';
import { groupRepository } from './group.repository';
import { Status } from '../enums/role.enum';

export class OrderRepository {
    async getAll(query: IOrderQuery, userId: string): Promise<IOrderList> {
        let page = parseInt(query?.page as string) || 1;
        let limit = parseInt(query?.limit as string) || 25;
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const filterObj: FilterQuery<IOrder> = {};
        if (query.name) {
            filterObj.name = { $regex: query.name, $options: 'i' };
        }
        if (query.surname) {
            filterObj.surname = { $regex: query.surname, $options: 'i' };
        }
        if (query.sum) {
            filterObj.sum = query.sum;
        }

        if (query.already_paid) {
            filterObj.already_paid = query.already_paid;
        }
        if (query.email) {
            filterObj.email = { $regex: query.email, $options: 'i' };
        }
        if (query.phone) {
            filterObj.phone = { $regex: query.phone, $options: 'i' };
        }
        if (query.age) {
            filterObj.age = query.age;
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
            filterObj.group = await groupRepository.findByName(query.group);
        }

        if (query.my === 'true') {
            filterObj.manager = new mongoose.Types.ObjectId(userId);
        }

        let sortField = query?.sort?.replace('-', '') || 'id';
        let sortOrder: SortOrder = query?.sort?.startsWith('-') ? -1 : 1;
        const sort: { [key: string]: SortOrder } = { [sortField]: sortOrder };

        const orderData = await ordersModel
            .find(filterObj)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate('group')
            .populate('manager')
            .exec();
        const totalOrders = await ordersModel.countDocuments(filterObj);
        const total = Math.ceil(totalOrders / limit);

        return { data: orderData.length ? orderData : [], total };
    }

    async post(dto: IOrder, managerId: string): Promise<IOrder> {
        const manager = new mongoose.Types.ObjectId(managerId);

        const orderCount = await ordersModel.countDocuments();
        const id = orderCount + 1;

        if (!dto.status) {
            dto.status = Status.NEW;
        }
        return await ordersModel.create({
            ...dto,
            id,
            manager,
        });
    }

    async getById(id: string): Promise<IOrder | null> {
        return await ordersModel.findById(id).exec();
    }

    async delete(id: string): Promise<IOrder | null> {
        return await ordersModel.findByIdAndDelete(id).exec();
    }

    async update(
        id: string,
        dto: IOrder,
        userId: string,
    ): Promise<IOrder | null> {
        if (dto.email) {
            const existing = await ordersModel.findOne({ email: dto.email });

            if (existing && existing._id.toString() !== id) {
                throw new Error('This email is already taken');
            }
        }

        if (dto?.group?.toString() === '') {
            dto.group = null;
        }

        if (dto.status === 'In work') {
            dto.manager = new mongoose.Types.ObjectId(userId);
        }

        const updated = await ordersModel.findByIdAndUpdate(id, dto, {
            new: true,
        });
        return updated ? updated.toObject<IOrder>() : null;
    }

    async addComment(
        _id: string,
        commentId: Types.ObjectId | undefined,
        userId: string,
    ): Promise<IOrder | null> {
        const id = new mongoose.Types.ObjectId(userId);
        return await ordersModel
            .findByIdAndUpdate(
                _id,
                {
                    $push: {
                        comment: commentId,
                    },
                    $set: {
                        manager: id,
                        status: Status.IN_WORK,
                    },
                },
                { new: true },
            )
            .exec();
    }

    async getDataForExport(
        query: IOrderQueryExport,
        userId: string,
    ): Promise<IOrder[]> {
        const filterObj: FilterQuery<IOrder> = {};
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
            filterObj.age = query.age;
        }
        if (query.sum) {
            filterObj.sum = query.sum;
        }

        if (query.already_paid) {
            filterObj.already_paid = query.already_paid;
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

        let sortField = query?.sort?.replace('-', '') || 'id';
        let sortOrder: SortOrder = query?.sort?.startsWith('-') ? -1 : 1;
        const sort: { [key: string]: SortOrder } = { [sortField]: sortOrder };

        return await ordersModel.find(filterObj).sort(sort).exec();
    }
    async statistics(): Promise<IStatistic> {
        const total = await ordersModel.countDocuments();
        const agree = await ordersModel.countDocuments({ status: 'Aggre' });
        const inWork = await ordersModel.countDocuments({ status: 'In work' });
        const disagree = await ordersModel.countDocuments({
            status: 'Disaggre',
        });
        const newOrders = await ordersModel.countDocuments({ status: 'New' });
        return {
            total,
            agree,
            inWork,
            disagree,
            newOrders,
        };
    }
    async inWork(userId: string): Promise<number> {
        const id = new mongoose.Types.ObjectId(userId);
        return await ordersModel
            .countDocuments({ status: 'In work', manager: id })
            .exec();
    }
    async total(userId: string): Promise<number> {
        const id = new mongoose.Types.ObjectId(userId);
        return await ordersModel.countDocuments({ manager: id }).exec();
    }
}

export const orderRepository = new OrderRepository();
