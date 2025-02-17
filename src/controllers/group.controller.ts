import { NextFunction, Response } from 'express';

import SuccessHandler from '../handlers/success.handler';
import {
    CustomRequest,
    CustomRequestBody,
    CustomRequestParams,
    CustomRequestParamsBody,
} from '../interfases/req.interfaces';
import { GroupService, groupService } from '../services/group.service';
import { IGroup } from '../interfases/group.interfaces';

class GroupController {
    constructor(private groupService: GroupService) {}

    getAll = async (
        _: CustomRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const group = await this.groupService.getAll();

            if (group) {
                SuccessHandler.created(res, group);
            }
        } catch (err) {
            next(err);
        }
    };

    getById = async (
        req: CustomRequestParams<{ groupId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const group = await this.groupService.getById(req.params.groupId);

            if (group) {
                SuccessHandler.created(res, group);
            }
        } catch (err) {
            next(err);
        }
    };

    post = async (
        req: CustomRequestBody<IGroup>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const comment = await this.groupService.post(req.body);
            if (comment) {
                SuccessHandler.created(res, comment);
            }
        } catch (err) {
            next(err);
        }
    };

    delete = async (
        req: CustomRequestParams<{ groupId: string }>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const group = await this.groupService.delete(req.params.groupId);
            if (group) {
                SuccessHandler.ok(res, group);
            }
        } catch (err) {
            next(err);
        }
    };

    update = async (
        req: CustomRequestParamsBody<{ groupId: string }, IGroup>,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const group = await this.groupService.update(
                req.params.groupId,
                req.body,
            );
            if (group) {
                SuccessHandler.ok(res, group);
            }
        } catch (err) {
            next(err);
        }
    };
}

export const groupController = new GroupController(groupService);
