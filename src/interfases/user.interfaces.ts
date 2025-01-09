import mongoose from 'mongoose';

export interface IUser {
    _id: mongoose.Types.ObjectId;
    username?: string | null;
    email: string;
    password?: string | null;
    role: 'user' | 'admin';
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    orders?: Array<mongoose.Types.ObjectId>;
    __v?: number;
}

export interface ICreateUserRequestBody {
    username: string;
    email: string;
    password: string;
}
