import express, { Application, Response } from 'express';
import 'dotenv/config';
import * as mongoose from 'mongoose';

import { config } from './config/config';

const app: Application = express();
const { port, dbUser, dbPassword, dbName } = config;

// Middleware для роботи з JSON
app.use(express.json());

console.log('Hello, TypeScript with Express!');

// Маршрут для перевірки сервера
app.get('/', (_, res: Response) => {
    res.send('Hello, TypeScript with Expres!');
});

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
