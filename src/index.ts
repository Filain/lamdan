import express, { Application, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import * as mongoose from 'mongoose';

import { config } from './config/config';
import { ErrorHandler } from './errors/handler.error';
import Logger from './libs/winston/logger';
import { authRouter } from './routes/auth.routes';
import { BaseError } from './errors/base.error';

const app: Application = express();

const errorHandler = new ErrorHandler(Logger());

const { port, dbUser, dbPassword, dbName } = config;

// Middleware для роботи з JSON
app.use(express.json());

// Маршрут для перевірки сервера
app.use('/auth', authRouter);
app.use(errorMiddleware);

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@mycluster.kb2zz.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    )
    .then(() => {
        Logger().info('✅ MongoDB connected successfully');
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port} 🚜🚜🚜`);
        });
    })
    .catch(error => {
        Logger().error('❌ MongoDB connection error:', error);
        process.exit(1);
    });

process.on('uncaughtException', async (error: Error) => {
    await errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
    throw reason;
});

async function errorMiddleware(
    err: BaseError,
    _: Request,
    _res: Response,
    next: NextFunction,
) {
    if (!errorHandler.isTrustedError(err)) {
        next(err);
        return;
    }
    await errorHandler.handleError(err);
    // під питанням в оригіналі того не було
    // res.status(err.httpCode || 500).json({
    //     message: err.message || 'Internal Server Error',
    // });
}

throw new BaseError('1', '2', '3', 500, true);
