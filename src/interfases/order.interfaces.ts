import mongoose from 'mongoose';

export interface IOrderList {
    data: IOrder[];
    total: number;
}

export interface IOrder {
    _id?: mongoose.Types.ObjectId;
    name: string;
    surname: string;
    email: string;
    phone: string;
    age: number;
    course: string;
    course_format: string;
    course_type: string;
    sum: number;
    already_paid: number;
    created_at: Date;
    utm: string;
    msg: string;
    status: string;
    manager?: string;
    group?: mongoose.Types.ObjectId;
    comment?: mongoose.Types.ObjectId[];
}

export type GetAllOrdersQuery = {
    page?: string;
    limit?: string;
};
