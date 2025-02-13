import mongoose from 'mongoose';

export interface IComment {
    _id?: mongoose.Types.ObjectId;
    comment: string;
    createdAt: Date;
    commentedBy: mongoose.Types.ObjectId;
}

export type GetAllOrdersQuery = {
    page?: string;
    limit?: string;
};
