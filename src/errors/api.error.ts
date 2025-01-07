import status from 'http-status';
import {BaseError} from "./base.error";

export class APIError extends BaseError {
    constructor(message: string, methodName = '', httpCode = status.INTERNAL_SERVER_ERROR, isOperational = true) {
        super('', message, methodName, httpCode, isOperational);
    }
}
