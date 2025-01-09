import winston from 'winston';

import { BaseError } from './base.error';

export class ErrorHandler {
    logger: winston.Logger;

    constructor(logger: winston.Logger) {
        this.logger = logger;
    }

    public async handleError(err: Error): Promise<void> {
        this.logger.error(err);
        // тут має бути логіка відправки помилки на пошту
        // тут має бути логіка запису помилки в базу помилок
    }

    public isTrustedError(error: Error) {
        return error instanceof BaseError && error.isOperational;
        // перевіряє чи ця помилка операційна
    }
}
