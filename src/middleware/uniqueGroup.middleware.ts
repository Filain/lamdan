import { Request, Response, NextFunction } from 'express';

import groupModel from '../models/group.model';
import { BaseError } from '../errors/base.error';
import { IGroup } from '../interfases/group.interfaces';

interface CustomRequestBody<T> extends Request {
    body: T;
    user?: { userId: string; userRole: string };
}

class CheckUniqueMiddleware {
    public group = async (
        req: CustomRequestBody<IGroup>,
        _res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { group } = req.body;

            const existingGroup = await groupModel.findOne({ group });

            if (existingGroup) {
                throw new BaseError(
                    'Group name must be unique',
                    'CheckUniqueGroupMiddleware',
                    409,
                );
            }

            next();
        } catch (error) {
            next(error);
        }
    };
}

export const checkUniqueMiddleware = new CheckUniqueMiddleware();
