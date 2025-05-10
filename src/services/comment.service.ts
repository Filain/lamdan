import status from 'http-status';

import { BaseError } from '../errors/base.error';
import {
    commentRepository,
    CommentRepository,
} from '../repository/comment.repository';
import { IComment } from '../interfases/commmet.interfaces';
import {
    orderRepository,
    OrderRepository,
} from '../repository/order.repository';

export class CommentService {
    constructor(
        private commentRepository: CommentRepository,
        private orderRepository: OrderRepository,
    ) {}

    async post(
        dto: IComment,
        userId: string,
        orderId: string,
    ): Promise<IComment> {
        const manager = await this.orderRepository.getById(orderId);
        if (
            !manager ||
            (manager.manager && manager.manager.toString() !== userId)
        ) {
            console.log('nene');
            throw new BaseError(
                'Order not found',
                'post.CommentService',
                status.CONFLICT,
            );
        }

        const comment = await this.commentRepository.post(dto, userId, orderId);
        if (!comment) {
            throw new BaseError(
                'Comment not created',
                'post.CommentService',
                status.UNPROCESSABLE_ENTITY,
                'Server error',
            );
        }
        const order = await this.orderRepository.addComment(
            orderId,
            comment._id,
            userId,
        );
        if (!order) {
            throw new BaseError(
                'Order not updated',
                'post.CommentService',
                status.UNPROCESSABLE_ENTITY,
                'Server error',
            );
        }
        return comment;
    }

    async getAll(orderId: string): Promise<IComment[]> {
        return await this.commentRepository.getAll(orderId);
    }

    async getById(id: string): Promise<IComment> {
        const comment = await this.commentRepository.getById(id);
        if (!comment) {
            throw new BaseError(
                'Comment not found',
                'getById.CommentService',
                status.CONFLICT,
            );
        }
        return comment;
    }

    async delete(id: string): Promise<IComment | null> {
        const deletedComment = await this.commentRepository.delete(id);
        if (!deletedComment) {
            throw new BaseError(
                'Comment is not deleted',
                'delete.CommentService',
                status.UNPROCESSABLE_ENTITY,
            );
        }
        return deletedComment;
    }

    async update(id: string, dto: IComment): Promise<IComment> {
        const updatedComment = await this.commentRepository.update(id, dto);
        if (!updatedComment) {
            throw new BaseError(
                'Comment is not updated',
                'update.CommentService',
                status.UNPROCESSABLE_ENTITY,
            );
        }
        return updatedComment;
    }
}

export const commentService = new CommentService(
    commentRepository,
    orderRepository,
);
