import mongoose from 'mongoose';

import { IComment } from '../interfases/commmet.interfaces';
import commentModel from '../models/comment.model';

export class CommentRepository {
    async post(
        dto: IComment,
        userId: string,
        orderId?: string,
    ): Promise<IComment> {
        // Перетворюємо userId на ObjectId для роботи з Mongoose
        const commentedBy = new mongoose.Types.ObjectId(userId);
        const order = new mongoose.Types.ObjectId(orderId);
        return await commentModel.create({ ...dto, commentedBy, order });
    }

    async getAll(orderId?: string): Promise<IComment[]> {
        return await commentModel
            .find({ order: orderId })
            .populate('commentedBy')
            .exec();
    }

    async getById(id: string): Promise<IComment | null> {
        return await commentModel.findById(id).exec();
    }

    async delete(id: string): Promise<IComment | null> {
        return await commentModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, dto: IComment): Promise<IComment | null> {
        return await commentModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
    }
}

export const commentRepository = new CommentRepository();
