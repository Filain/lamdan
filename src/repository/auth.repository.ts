import { ICreateUserRequestBody, IUser } from '../interfases/user.interfaces';
import userModel from '../models/user.model';

export class AuthRepository {
    async registerUser(userData: ICreateUserRequestBody): Promise<IUser> {
        return await userModel.create(userData);
    }

    async findUserByEmail(email: string): Promise<IUser | null> {
        return await userModel.findOne({ email });
    }
}

export const authRepository = new AuthRepository();
