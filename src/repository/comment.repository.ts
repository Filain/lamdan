import mongoose from 'mongoose';

import { IComment } from '../interfases/commmet.interfaces';
import commentModel from '../models/comment.model';

export class CommentRepository {
    async post(dto: IComment, userId: string): Promise<IComment> {
        // Перетворюємо userId на ObjectId для роботи з Mongoose
        const commentedBy = new mongoose.Types.ObjectId(userId);
        // Створюємо коментар
        return await commentModel.create({ ...dto, commentedBy });
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
