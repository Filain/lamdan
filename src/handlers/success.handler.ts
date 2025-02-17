import { Response } from 'express';
import status from 'http-status';

import BaseHandler from './base.handler';

class SuccessHandler extends BaseHandler {
    static ok(response: Response, data?: unknown): Response {
        return this.responseConstructor(response, status.OK, data);
    }
    static created(response: Response, data?: unknown): Response {
        return this.responseConstructor(response, status.CREATED, data);
    }
    static noContent(response: Response): Response {
        return response.status(status.NO_CONTENT).send();
    }
    static file(
        response: Response,
        buffer: Buffer,
        filename: string,
    ): Response {
        response.setHeader(
            'Content-Disposition',
            `attachment; filename="${filename}"`,
        );
        response.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );

        return response.send(buffer);
    }
}

export default SuccessHandler;
