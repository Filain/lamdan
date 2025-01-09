import winston from 'winston';

const logFormat = winston.format.printf(
    ({
        level,
        message,
        timestamp,
        stack,
        methodName,
        log,
        httpCode,
        isOperational,
    }) => {
        return (
            `${level}` +
            (httpCode ? `  HttpCode:${httpCode},` : '') +
            (methodName ? `  Method:${methodName},` : '') +
            (log ? `  LOG:${log},` : '') +
            `  Message:${message},` +
            (isOperational ? `  isOperational:${isOperational},` : '') +
            ` ${timestamp}` +
            (stack ? `\n${stack}` : '')
        );
    },
);

const Logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        logFormat,
    ),
    transports: [new winston.transports.Console()],
});

export default Logger;
