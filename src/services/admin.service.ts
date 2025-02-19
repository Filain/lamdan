import status from 'http-status';
import jwt from 'jsonwebtoken';

// import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config/config';
import { BaseError } from '../errors/base.error';
import {
    orderRepository,
    OrderRepository,
} from '../repository/order.repository';
import { userRepository, UserRepository } from '../repository/user.repository';
import {
    GetAllPaginationQuery,
    IStatistic,
    IUser,
    IUserList,
} from '../interfases/user.interfaces';
import { emailService } from './email.service';
import createHash from '../libs/bcrypt/createHash';

export class AdminService {
    constructor(
        private orderRepository: OrderRepository,
        private userRepository: UserRepository,
    ) {}

    async getAll(query: GetAllPaginationQuery): Promise<IUserList> {
        const users = await this.userRepository.getAll(query);
        if (!users) {
            throw new BaseError(
                'Users not found',
                'getAll.AdminService',
                status.CONFLICT,
            );
        }
        return users;
    }

    async getStatistics(): Promise<IStatistic> {
        const statistics = await this.orderRepository.statistics();

        if (!statistics) {
            throw new BaseError(
                'Statistics not created',
                'getStatistics.AdminService',
                status.CONFLICT,
                'Server error statistics not created',
            );
        }
        return statistics;
    }

    async banUser(id: string): Promise<IUser> {
        const user = await this.userRepository.banUser(id);
        if (!user) {
            throw new BaseError(
                'User not found',
                'banUser.AdminService',
                status.CONFLICT,
            );
        }
        return user;
    }

    async unbanUser(id: string): Promise<IUser> {
        const user = await this.userRepository.unbanUser(id);
        if (!user) {
            throw new BaseError(
                'User not found',
                'banUser.AdminService',
                status.CONFLICT,
            );
        }
        return user;
    }

    async getActivationToken(id: string): Promise<boolean> {
        const actionToken = jwt.sign({ userId: id }, config.jwt_secret, {
            expiresIn: config.jwt_action_expires,
        });
        if (!actionToken) {
            throw new BaseError(
                'Action token not created',
                'getActivationToken.AdminService',
                status.CONFLICT,
                'Server error action token not created',
            );
        }
        const verificationLink = `http://localhost:${config.port}/active/:${actionToken}`;

        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new BaseError(
                'User not found',
                'getActivationToken.AdminService',
                status.CONFLICT,
            );
        }
        return await emailService.sendEmail(
            user.email,
            'Activate your account',
            `<p>Please use the following link to activate your account:</p><a href="${verificationLink}">Activate your account</a>`,
        );
    }

    async activate(token: string): Promise<IUser> {
        const { userId } = jwt.verify(token, config.jwt_secret) as {
            userId: string;
        };
        if (!userId) {
            throw new BaseError(
                'User not found',
                'activate.AdminService',
                status.UNPROCESSABLE_ENTITY,
            );
        }
        const activatedUser = await this.userRepository.activateUser(userId);
        if (!activatedUser) {
            throw new BaseError(
                'Order is not updated',
                'update.AdminService',
                status.UNPROCESSABLE_ENTITY,
            );
        }
        return activatedUser;
    }

    async changePassword(id: string, password: string): Promise<IUser | null> {
        const user = await this.userRepository.getById(id);
        if (!user) {
            throw new BaseError(
                'User not found',
                'changePassword.AdminService',
                status.UNPROCESSABLE_ENTITY,
                'Server error',
            );
        }
        const hashPassword = await createHash(password as string);
        const changePassword = await this.userRepository.changePassword(
            id,
            hashPassword,
        );
        if (!changePassword) {
            throw new BaseError(
                'Password is not changed',
                'changePassword.AdminService',
                status.UNPROCESSABLE_ENTITY,
            );
        }
        return changePassword;
    }
}

export const adminService = new AdminService(orderRepository, userRepository);
