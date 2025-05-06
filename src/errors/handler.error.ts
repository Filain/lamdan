import winston from 'winston';

import { BaseError } from './base.error';

export class ErrorHandler {
    logger: winston.Logger;

    constructor(logger: winston.Logger) {
        this.logger = logger;
    }

    public async handleError(err: Error): Promise<void> {
        this.logger.error(err);
    }

    public isTrustedError(error: Error) {
        return error instanceof BaseError && error.isOperational;
    }
}
