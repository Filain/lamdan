import { Response } from 'express';
import status from 'http-status';

import BaseHandler from './base.handler';

class SuccessHandler extends BaseHandler {
    static ok(response: Response, data: unknown): Response {
        return this.responseConstructor(response, status.OK, data);
    }
    static created(response: Response, data: unknown): Response {
        return this.responseConstructor(response, status.CREATED, data);
    }
    static noContent(response: Response): Response {
        return response.status(status.NO_CONTENT).send();
    }
}

export default SuccessHandler;
