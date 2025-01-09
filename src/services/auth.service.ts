import { authRepository, AuthRepository } from '../repository/auth.repository';
import { ICreateUserRequestBody, IUser } from '../interfases/user.interfaces';
import { BaseError } from '../errors/base.error';

export class AuthService {
    constructor(private authRepository: AuthRepository) {}

    async registerUser(userData: ICreateUserRequestBody): Promise<IUser> {
        const user = await this.authRepository.findUserByEmail(userData.email);

        if (user) {
            throw new BaseError(
                'Could not save in DB, already exists',
                'registerUser',
                'registerUser',
                400,
            );
        }

        return await this.authRepository.registerUser(userData);
    }
    test(): void {
        throw new BaseError('test', 'test2', 'test', 500, false);
    }
}

export const authService = new AuthService(authRepository);
