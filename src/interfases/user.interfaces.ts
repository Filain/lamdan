import mongoose from 'mongoose';
import { JwtPayload } from 'jsonwebtoken';

import { ActivationEnum, RoleEnum } from '../enums/role.enum';

export interface IUser {
    _id: mongoose.Types.ObjectId;
    name?: string | null;
    surname?: string | null;
    email: string;
    password?: string | null;
    role: RoleEnum | string;
    isActive: boolean;
    isBanned: boolean;
    inWork: number;
    total: number;
    activation?: ActivationEnum | string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type IUserResponsePresenter = Omit<IUser, 'password'>;

export interface IUserResponseListPresenter {
    data: IUserResponsePresenter[];
    total: number;
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
