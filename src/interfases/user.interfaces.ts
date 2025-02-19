import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

export interface IUser {
    _id: mongoose.Types.ObjectId;
    username?: string | null;
    email: string;
    password?: string | null;
    role: 'manager' | 'admin';
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    orders?: Array<mongoose.Types.ObjectId>;
    __v?: number;
}

export interface ICreateUserRequestBody {
    username?: string;
    email: string;
    password: string;
}
export interface ILoginUserRequestBody {
    email: string;
    password: string;
}

export interface IUserResponse {
    data: IUser;
}

export interface TokenPayload extends JwtPayload {
    uid: string;
    role: string;
}

export type AuthTokens = { accessToken: string; refreshToken: string };

export interface IUserList {
    data: IUser[];
    total: number;
}

export type GetAllPaginationQuery = {
    page?: string;
    limit?: string;
};

export interface IStatistic {
    total: number;
    agree: number;
    inWork: number;
    disagree: number;
    newOrders: number;
}
