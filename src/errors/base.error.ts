import status from 'http-status';

export class BaseError extends Error {
    public readonly log: string;
    public readonly methodName: string | unknown;
    public readonly httpCode: number;
    public readonly isOperational: boolean;

    constructor(
        log: string, // ДЛЯ РОЗРОБНИКІВ Обов'язкове повідомлення для логів
        methodName?: string, // Метод, де сталася помилка
        httpCode: number = status.INTERNAL_SERVER_ERROR, // HTTP-код за замовчуванням = 500
        message: string | unknown = log, // Для зовнішніх користувачів Повідомлення за замовчуванням = log
        isOperational = true, // Операційна помилка ( Запланована помилка, наприклад валідація )
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
