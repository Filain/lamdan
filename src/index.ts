import express, { Application, Response } from 'express';
import 'dotenv/config';
import * as mongoose from 'mongoose';

import { config } from './config/config';
import {ErrorHandler} from "./errors/handler.error";
import Logger from "./libs/winston/logger";
import {BaseError} from "./errors/base.error";


const app: Application = express();
const errorHandler = new ErrorHandler(Logger());

const { port, dbUser, dbPassword, dbName } = config;

// Middleware для роботи з JSON
app.use(express.json());

console.log('Hello, TypeScript with Express!');

// Маршрут для перевірки сервера
app.get('/', (_, res: Response) => {
    res.send('Hello, TypeScript with Expres!');

});
Logger().info('Інформація про запуск сервера');

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPassword}@mycluster.kb2zz.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    )
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port} 🚜🚜🚜`);
        });
    })
    .catch(error => {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    });

process.on('uncaughtException', async (error: Error) => {
    await errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
    throw reason;
});

throw new BaseError ('Та', 'тут', "метот", 400, true);



