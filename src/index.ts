import express, { Application } from 'express';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';

import { config } from './config/config';
import { ErrorHandler } from './errors/handler.error';
import Logger from './libs/winston/logger';
import { authRouter } from './routes/auth.routes';
import { errorMiddleware } from './middleware/errorMiddleware';
import userModel from './models/user.model';

const app: Application = express();

const errorHandler = new ErrorHandler(Logger);

const { port, dbUser, dbPassword, dbName } = config;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Маршрут для перевірки сервера
app.use('/auth', authRouter);

async function createDefaultAdmin() {
    const existingAdmin = await userModel.findOne({ email: 'admin@gmail.com' });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin', 10);
        await userModel.create({
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: 'admin',
        });
        Logger.info('👨 Default admin user created');
    }
}

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
    .then(() => createDefaultAdmin())
    .catch(error => {
        Logger.error('❌ MongoDB connection error:', error);
        process.exit(1);
    });

app.use(errorMiddleware);

process.on('uncaughtException', async (error: Error) => {
    await errorHandler.handleError(error);
    if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on('unhandledRejection', (reason: Error) => {
    throw reason;
});
