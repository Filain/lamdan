import status from 'http-status';

export class BaseError extends Error {
    public readonly log: string;
    public readonly methodName: string | unknown;
    public readonly httpCode: number;
    public readonly isOperational: boolean;

    constructor(
        log: string, // ДЛЯ РОЗРОБНИКІВ Обов'язкове повідомлення для логів
        message: string | unknown = log, // Для зовнішніх користувачів Повідомлення за замовчуванням = log
        methodName?: string, // Метод, де сталася помилка
        httpCode: number = status.INTERNAL_SERVER_ERROR, // HTTP-код за замовчуванням = 500
        isOperational = true, // Операційна помилка ( Запланована помилка, наприклад валідація )
    ) {
        super(<string>message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.log = log;
        if (methodName) this.methodName = methodName;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}
