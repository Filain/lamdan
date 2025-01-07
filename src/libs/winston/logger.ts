import winston from "winston";

const { format, createLogger, transports } = winston;
const { timestamp, combine, printf, errors } = format;

function Logger() {
    const logFormat = printf(({ level, message, timestamp, stack, methodName, log, httpCode, isOperational }) => {
        return `${level} ${timestamp} Message:${message}` +
            (methodName ? `, Method:${methodName}` : '') +
            (log ? `, Log:${log}` : '') +
            (httpCode ? `, HttpCode:${httpCode}` : '') +
            (isOperational ? `, IsOperational:${isOperational}` : '') +
            (stack ? `, \n ${stack}` : '');
    });

    return createLogger({
        format: combine(
            format.colorize(),
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }),
            logFormat
        ),
        transports: [new transports.Console()],
    });
}

export default Logger