import { NextFunction, Response } from 'express';
import status from 'http-status';

import SuccessHandler from '../handlers/success.handler';
import { IOrderQuery } from '../interfases/order.interfaces';
import { CustomQueryRequest } from '../interfases/req.interfaces';
import { ExelService, exelService } from '../services/exel.service';
import { BaseError } from '../errors/base.error';

class ExelController {
    constructor(private exelService: ExelService) {}

    exportToExcel = async (
        req: CustomQueryRequest,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const query = req.query as IOrderQuery;
            const userId = req.user?.userId;

            if (!userId) {
                throw new BaseError(
                    'User not logged in or not found',
                    'OrderController.post',
                    status.NOT_FOUND,
                    'User not found',
                );
            }

            const buffer = await this.exelService.generateExcelFile(
                query,
                userId,
            );

            if (buffer) {
                SuccessHandler.file(res, buffer, 'orders.xlsx');
            }
        } catch (err) {
            next(err);
        }
    };
}

export const exelController = new ExelController(exelService);
