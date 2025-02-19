import userModel from '../models/user.model';
import {
    GetAllPaginationQuery,
    IUser,
    IUserList,
} from '../interfases/user.interfaces';

export class UserRepository {
    // async post(userId: string, orderId: Types.ObjectId): Promise<IUser | null> {
    //     return await userModel
    //         .findByIdAndUpdate(
    //             userId,
    //             { $push: { orders: orderId } },
    //             { new: true },
    //         )
    //         .exec();
    // }
    async getAll(query: GetAllPaginationQuery): Promise<IUserList> {
        let page = parseInt(query?.page as string) || 1;
        let limit = parseInt(query?.limit as string) || 10;
        if (page < 1) page = 1;
        if (limit < 1) limit = 10;
        const userData = await userModel
            .find()
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

    async changePassword(
        userId: string,
        password: string,
    ): Promise<IUser | null> {
        return await userModel
            .findByIdAndUpdate({ _id: userId }, { password }, { new: true })
            .exec();
    }
}

export const userRepository = new UserRepository();
