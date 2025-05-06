import { NextFunction, Request, Response } from 'express';

import Logger from '../libs/winston/logger';
import { ErrorHandler } from '../errors/handler.error';
import { BaseError } from '../errors/base.error';

const errorHandler = new ErrorHandler(Logger);

export async function errorMiddleware(
    err: BaseError,
    _: Request,
    res: Response,
    next: NextFunction,
) {
    if (!errorHandler.isTrustedError(err)) {
        next(err);
        return;
    }
    await errorHandler.handleError(err);
    res.status(err.httpCode || 500).json({
        message: err.message || 'Internal Server Error',
    });
}
