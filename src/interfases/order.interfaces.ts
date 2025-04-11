import mongoose from 'mongoose';

export interface IOrderList {
    data: IOrder[];
    total: number;
}

export interface IOrder {
    _id?: mongoose.Types.ObjectId;
    name?: string | null;
    surname?: string | null;
    email?: string | null;
    phone?: string | null;
    age?: number | null;
    course?: string | null;
    course_format?: string | null;
    course_type?: string | null;
    sum?: number | null;
    already_paid?: number | null;
    created_at?: Date;
    utm?: string | null;
    msg?: string | null;
    status?: string | null;
    manager?: string | null;
    group?: mongoose.Types.ObjectId | null;
    comment?: mongoose.Types.ObjectId[] | null;
}

export interface IOrderQuery {
    page?: string;
    limit?: string;
    sort?: string;
    name: string;
    surname: string;
    email: string;
    phone: string;
    age: number;
    course: string;
    course_format: string;
    course_type: string;
    status: string;
    group?: mongoose.Types.ObjectId;
    my: string;
}


export interface IOrderCreate {
    group: string | null;
    name: string | null;
    surname: string | null;
    email: string | null;
    phone: string | null;
    age: number | null;
    status: string | null;
    sum: number | null;
    course: string | null;
    already_paid: number | null;
    course_format: string | null;
    course_type: string | null;
}

export type IOrderQueryExport = Omit<IOrderQuery, 'page' | 'limit'>;

export type GetAllOrdersQuery = {
    page?: string;
    limit?: string;
};
