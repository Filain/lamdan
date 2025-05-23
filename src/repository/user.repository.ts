import userModel from '../models/user.model';
import {
    GetAllPaginationQuery,
    IUser,
    IUserList,
} from '../interfases/user.interfaces';
import { ICreateAdminRequestBody } from '../interfases/admin.interfaces';

export class UserRepository {
    async getAll(query: GetAllPaginationQuery): Promise<IUserList> {
        let page = parseInt(query?.page as string) || 1;
        let limit = parseInt(query?.limit as string) || 10;
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;

        const userData = await userModel
            .find()
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        const totalUsers = await userModel.countDocuments();
        const total = Math.ceil(totalUsers / limit);

        return { data: userData, total };
    }

    async getById(id: string): Promise<IUser | null> {
        return await userModel.findById(id).exec();
    }

    async banUser(userId: string): Promise<IUser | null> {
        return await userModel
            .findByIdAndUpdate(
                { _id: userId },
                { isBanned: true },
                { new: true },
            )
            .exec();
    }

    async unbanUser(userId: string): Promise<IUser | null> {
        return await userModel
            .findByIdAndUpdate(
                { _id: userId },
                { isBanned: false },
                { new: true },
            )
            .exec();
    }

    async activateUser(userId: string): Promise<IUser | null> {
        return await userModel
            .findByIdAndUpdate(
                { _id: userId },
                { isActive: true },
                { new: true },
            )
            .exec();
    }

    async activationProcess(
        userId: string,
        activation: string,
    ): Promise<IUser | null> {
        return await userModel
            .findByIdAndUpdate({ _id: userId }, { activation }, { new: true })
            .exec();
    }

    async changePassword(
        userId: string,
        password: string,
    ): Promise<IUser | null> {
        return await userModel
            .findByIdAndUpdate({ _id: userId }, { password }, { new: true })
            .exec();
    }

    async create(user: ICreateAdminRequestBody): Promise<IUser> {
        return await userModel.create(user);
    }

    async getByEmail(email: string): Promise<IUser | null> {
        return await userModel.findOne({ email }).exec();
    }

    async update(
        id: string,
        inWork: number,
        total: number,
    ): Promise<IUser | null> {
        return await userModel
            .findByIdAndUpdate(id, { inWork, total }, { new: true })
            .exec();
    }
}

export const userRepository = new UserRepository();
