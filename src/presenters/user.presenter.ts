import {
    IUser,
    IUserResponseListPresenter,
    IUserResponsePresenter,
} from '../interfases/user.interfaces';

class UserPresenter {
    public toPublicResDto(entity: IUser): IUserResponsePresenter {
        return {
            _id: entity._id,
            name: entity.name,
            surname: entity.surname,
            email: entity.email,
            role: entity.role,
            isActive: entity.isActive,
            isBanned: entity.isBanned,
            inWork: entity.inWork,
            total: entity.total,
            activation: entity.activation,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }
    public toListDto(
        entities: IUser[],
        total: number,
    ): IUserResponseListPresenter {
        return {
            data: entities.map(this.toPublicResDto),
            total,
        };
    }
}

export const userPresenter = new UserPresenter();
