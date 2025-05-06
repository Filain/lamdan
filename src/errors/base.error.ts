import status from 'http-status';

export class BaseError extends Error {
    public readonly log: string;
    public readonly methodName: string | unknown;
    public readonly httpCode: number;
    public readonly isOperational: boolean;

    constructor(
        log: string,
        methodName?: string,
        httpCode: number = status.INTERNAL_SERVER_ERROR,
        message: string | unknown = log,
        isOperational = true,
    ) {
        super(<string>message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.log = log;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        if (methodName) this.methodName = methodName;

        Error.captureStackTrace(this);
    }
}
