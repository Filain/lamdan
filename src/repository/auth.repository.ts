import { ICreateUserRequestBody, IUser } from '../interfases/user.interfaces';
import userModel from '../models/user.model';
import { BaseError } from '../errors/base.error';

export class AuthRepository {
    async registerUser(userData: ICreateUserRequestBody): Promise<IUser> {
        return await userModel.create(userData);
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await userModel.findOne({ email }).exec();
    }

    async updatePassword(userId: string, password: string): Promise<IUser> {
        const user = await userModel.findById(userId).exec();
        if (!user) {
            throw new BaseError('User not found', 'updatePassword', 404);
        }
        await userModel.updateOne({ _id: userId }, { password }).exec();
        return user;
    }
    async findUserById(userId: string): Promise<IUser> {
        const user = await userModel.findById(userId).exec();
        if (!user) {
            throw new BaseError('User not found', 'findUserById', 404);
        }
        return user;
    }
}

export const authRepository = new AuthRepository();
