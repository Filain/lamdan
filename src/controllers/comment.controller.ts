import { NextFunction, Response } from 'express';
import status from 'http-status';

import SuccessHandler from '../handlers/success.handler';
import { BaseError } from '../errors/base.error';
import {
    CustomRequestParams,
    CustomRequestParamsBody,
} from '../interfases/req.interfaces';
import { CommentService, commentService } from '../services/comment.service';
import { IComment } from '../interfases/commmet.interfaces';

class CommentController {
    constructor(private commentService: CommentService) {}

    post = async (
        req: CustomRequestParamsBody<{ orderId: string }, IComment>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const userId = req.user?.userId;
            const orderId = req.params.orderId;
            if (!userId) {
                throw new BaseError(
                    'User not logged in or not found',
                    'OrderController.post',
                    status.NOT_FOUND,
                    'User not found',
                );
            }
            const comment = await this.commentService.post(
                req.body,
                userId,
                orderId,
            );
            if (comment) {
                SuccessHandler.created(res, comment);
            }
        } catch (err) {
            next(err);
        }
    };

    getById = async (
        req: CustomRequestParams<{ commentId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const comment = await this.commentService.getById(
                req.params.commentId,
            );

            if (comment) {
                SuccessHandler.ok(res, comment);
            }
        } catch (err) {
            next(err);
        }
    };

    delete = async (
        req: CustomRequestParams<{ commentId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.commentService.delete(
                req.params.commentId,
            );
            if (order) {
                SuccessHandler.ok(res, order);
            }
        } catch (err) {
            next(err);
        }
    };

    update = async (
        req: CustomRequestParamsBody<{ commentId: string }, IComment>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.commentService.update(
                req.params.commentId,
                req.body,
            );
            if (order) {
                SuccessHandler.ok(res, order);
            }
        } catch (err) {
            next(err);
        }
    };
}

export const commentController = new CommentController(commentService);
