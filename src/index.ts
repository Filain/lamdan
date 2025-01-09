import express, { Application } from 'express';
import 'dotenv/config';
import * as mongoose from 'mongoose';

import { config } from './config/config';
import { ErrorHandler } from './errors/handler.error';
import Logger from './libs/winston/logger';
import { authRouter } from './routes/auth.routes';
import { BaseError } from './errors/base.error';
import { errorMiddleware } from './middleware/errorMiddleware';

const app: Application = express();

const errorHandler = new ErrorHandler(Logger);

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
        Logger.info('✅ MongoDB connected successfully');
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port} 🚜🚜🚜`);
        });
    })
    .catch(error => {
        Logger.error('❌ MongoDB connection error:', error);
        process.exit(1);
    });

process.on('uncaughtException', async (error: Error) => {
    await errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
    throw reason;
});

throw new BaseError('1', '2', 400);
