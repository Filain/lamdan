import { NextFunction, Request, Response } from 'express';
import { isObjectIdOrHexString } from 'mongoose';
import status from 'http-status';
import Joi, { ObjectSchema } from 'joi';

import { BaseError } from '../errors/base.error';

class CommonMiddleware {
    public isIdValid(key: string) {
        return (req: Request, _res: Response, next: NextFunction) => {
            try {
                if (!isObjectIdOrHexString(req.params[key])) {
                    throw new BaseError(
                        'Invalid ID',
                        'CommonMiddleware.isIdValid',
                        status.BAD_REQUEST,
                    );
                }
                next();
            } catch (e) {
                next(e);
            }
        };
    }

    public isBodyValid(validator: ObjectSchema) {
        return async (req: Request, _res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                if (e instanceof Joi.ValidationError) {
                    next(
                        new BaseError(
                            e.details[0].message,
                            'CommonMiddleware.isBodyValid',
                            status.BAD_REQUEST,
                        ),
                    );
                } else {
                    next(e);
                }
            }
        };
    }

    public isQueryValid(validator: ObjectSchema) {
        return async (req: Request, _res: Response, next: NextFunction) => {
            try {
                req.query = await validator.validateAsync(req.query);
                next();
            } catch (e) {
                if (e instanceof Joi.ValidationError) {
                    next(
                        new BaseError(
                            e.details[0].message,
                            'CommonMiddleware.isQueryValid',
                            status.BAD_REQUEST,
                        ),
                    );
                } else {
                    next(e);
                }
            }
        };
    }
}

export const commonMiddleware = new CommonMiddleware();
