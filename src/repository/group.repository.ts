import { IGroup } from '../interfases/group.interfaces';
import groupModel from '../models/group.model';

export class GroupRepository {
    async getAll(): Promise<IGroup[]> {
        return await groupModel.find().exec();
    }

    async getById(id: string): Promise<IGroup | null> {
        return await groupModel.findById(id).exec();
    }

    async post(dto: IGroup): Promise<IGroup> {
        return await groupModel.create(dto);
    }

    async delete(id: string): Promise<IGroup | null> {
        return await groupModel.findByIdAndDelete(id).exec();
    }

    async update(id: string, dto: IGroup): Promise<IGroup | null> {
        return await groupModel
            .findByIdAndUpdate(id, dto, { new: true })
            .exec();
    }
}

export const groupRepository = new GroupRepository();
