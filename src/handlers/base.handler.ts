import { Response } from 'express';

class BaseHandler {
    static responseConstructor(
        response: Response,
        statusCode: number,
        data: unknown,
    ): Response {
        return response.status(statusCode).json(data);
    }
}

export default BaseHandler;
