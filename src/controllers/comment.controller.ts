import { NextFunction, Response } from 'express';
import status from 'http-status';

import SuccessHandler from '../handlers/success.handler';
import { IOrder } from '../interfases/order.interfaces';
import { BaseError } from '../errors/base.error';
import {
    CustomRequestBody,
    CustomRequestParams,
} from '../interfases/req.interfaces';
import { CommentService, commentService } from '../services/comment.service';

class CommentController {
    constructor(private commentService: CommentService) {}

    post = async (
        req: CustomRequestBody<IOrder>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            if (!req.user) {
                throw new BaseError(
                    'User not logged in or not found',
                    'OrderController.post',
                    status.NOT_FOUND,
                    'User not found',
                );
            }
            const orders = await this.commentService.post(req.body);
            if (orders) {
                SuccessHandler.created(res, orders);
            }
        } catch (err) {
            next(err);
        }
    };

    getById = async (
        req: CustomRequestParams<{ orderId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.commentService.getById(req.params.orderId);

            if (order) {
                SuccessHandler.created(res, order);
            }
        } catch (err) {
            next(err);
        }
    };

    delete = async (
        req: CustomRequestParams<{ orderId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.commentService.delete(req.params.orderId);
            if (order) {
                SuccessHandler.created(res, order);
            }
        } catch (err) {
            next(err);
        }
    };

    update = async (
        req: CustomRequestParams<{ orderId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const order = await this.commentService.update(
                req.params.orderId,
                req.body,
            );
            if (order) {
                SuccessHandler.created(res, order);
            }
        } catch (err) {
            next(err);
        }
    };
}

export const commentController = new CommentController(commentService);
