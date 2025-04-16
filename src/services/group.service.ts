import status from 'http-status';

import { BaseError } from '../errors/base.error';
import { IGroup } from '../interfases/group.interfaces';
import {
    GroupRepository,
    groupRepository,
} from '../repository/group.repository';

export class GroupService {
    constructor(private groupRepository: GroupRepository) {}

    async getAll(): Promise<IGroup[]> {
        const group = await this.groupRepository.getAll();
        if (!group) {
            throw new BaseError(
                'Group not found',
                'getAll.GroupService',
                status.CONFLICT,
            );
        }
        return group;
    }

    async getById(id: string): Promise<IGroup> {
        const group = await this.groupRepository.getById(id);
        if (!group) {
            throw new BaseError(
                'Comment not found',
                'getById.GroupService',
                status.CONFLICT,
            );
        }
        return group;
    }

    async post(dto: IGroup): Promise<IGroup> {
        const group = await this.groupRepository.post(dto);
        if (!group) {
            throw new BaseError(
                'Group not created',
                'post.GroupService',
                status.UNPROCESSABLE_ENTITY,
                'Server error',
            );
        }

        return group;
    }

    async delete(groupId: string): Promise<IGroup | null> {
        const deletedGroup = await this.groupRepository.delete(groupId);
        if (!deletedGroup) {
            throw new BaseError(
                'Comment is not deleted',
                'delete.GroupService',
                status.UNPROCESSABLE_ENTITY,
            );
        }
        return deletedGroup;
    }

    async update(id: string, dto: IGroup): Promise<IGroup> {
        const updatedGroup = await this.groupRepository.update(id, dto);
        if (!updatedGroup) {
            throw new BaseError(
                'Comment is not updated',
                'update.GroupService',
                status.UNPROCESSABLE_ENTITY,
            );
        }
        return updatedGroup;
    }
}

export const groupService = new GroupService(groupRepository);
