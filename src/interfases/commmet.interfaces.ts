import mongoose from 'mongoose';

export interface IComment {
    _id?: mongoose.Types.ObjectId;
    comment: string;
    order: mongoose.Types.ObjectId;
    createdAt: Date;
    commentedBy: mongoose.Types.ObjectId;
}

export type GetAllOrdersQuery = {
    page?: string;
    limit?: string;
};
