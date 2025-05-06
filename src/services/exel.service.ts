import status from 'http-status';
import ExcelJS from 'exceljs';

import { BaseError } from '../errors/base.error';
import {
    orderRepository,
    OrderRepository,
} from '../repository/order.repository';
import { IOrderQueryExport } from '../interfases/order.interfaces';

export class ExelService {
    constructor(private orderRepository: OrderRepository) {}

    async generateExcelFile(
        query: IOrderQueryExport,
        userId: string,
    ): Promise<Buffer> {
        const orders = await this.orderRepository.getDataForExport(
            query,
            userId,
        );
        if (!orders) {
            throw new BaseError(
                'Orders not found',
                'getAll.OrderService',
                status.CONFLICT,
            );
        }

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Exported Data');

        worksheet.columns = [
            { header: 'ID', key: '_id', width: 25 },
            { header: 'Age', key: 'age', width: 10 },
            { header: 'Already_paid', key: 'already_paid', width: 15 },
            { header: 'Course', key: 'course', width: 15 },
            { header: 'Course_format', key: 'course_format', width: 15 },
            { header: 'Course_type', key: 'course_type', width: 15 },
            { header: 'Email', key: 'email', width: 30 },
            { header: 'Msg', key: 'msg', width: 30 },
            { header: 'Name', key: 'name', width: 20 },
            { header: 'Phone', key: 'phone', width: 30 },
            { header: 'Status', key: 'status', width: 15 },
            { header: 'Sum', key: 'sum', width: 15 },
            { header: 'Surname', key: 'surname', width: 20 },
            { header: 'Utm', key: 'utm', width: 30 },
            { header: 'Comment', key: 'comment', width: 30 },
            { header: 'Дата створення', key: 'createdAt', width: 25 },
        ];
        orders.forEach(item => {
            worksheet.addRow(item);
        });

        const uint8Array = await workbook.xlsx.writeBuffer();
        return Buffer.from(uint8Array);
    }
}

export const exelService = new ExelService(orderRepository);
