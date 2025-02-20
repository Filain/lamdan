import express, { Application } from 'express';
import 'dotenv/config';
import * as mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';

import { config } from './config/config';
import { ErrorHandler } from './errors/handler.error';
import Logger from './libs/winston/logger';
import { authRouter } from './routes/auth.routes';
import { errorMiddleware } from './middleware/error.middleware';
import userModel from './models/user.model';
import { orderRouter } from './routes/order.routes';
import { commentRouter } from './routes/comment.routes';
import { groupRouter } from './routes/group.routes';
import { exelRouter } from './routes/exel.routes';
import { adminRouter } from './routes/admin.routes';
import { RoleEnum } from './enums/role.enum';
import { bannedMiddleware } from './middleware/banned.middleware';

const app: Application = express();

const errorHandler = new ErrorHandler(Logger);

const { port, dbUser, dbPassword, dbName, bcryptSaltRounds } = config;

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(bannedMiddleware);

// Маршрут для перевірки сервера
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/order', orderRouter);
app.use('/comment', commentRouter);
app.use('/group', groupRouter);
app.use('/exel', exelRouter);

async function createDefaultAdmin() {
    const existingAdmin = await userModel.findOne({ email: 'admin@gmail.com' });
    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin', bcryptSaltRounds);
        await userModel.create({
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: RoleEnum.ADMIN,
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
