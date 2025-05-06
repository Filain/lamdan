import { Request } from 'express';

import { IOrderQuery } from './order.interfaces';
import { GetAllPaginationQuery } from './user.interfaces';

export interface CustomRequest extends Request {
    user?: { userId: string; userRole: string };
}

export interface CustomRequestBody<T> extends Request<unknown, unknown, T> {
    user?: { userId: string; userRole: string }; // Додай user, якщо використовуєш авторизацію
    body: T;
}

export interface CustomQueryRequest extends Request {
    user?: { userId: string; userRole: string };
    query: Record<string, never> & IOrderQuery;
}

export interface CustomQueryPaginatedRequest extends Request {
    user?: { userId: string; userRole: string };
    query: Record<string, never> & GetAllPaginationQuery;
}

export interface CustomRequestParams<Params = unknown> extends Request<Params> {
    user?: { userId: string; userRole: string };
    params: Params;
}

export interface CustomRequestParamsBody<Params = unknown, Body = unknown>
    extends Request<Params, never, Body> {
    user?: { userId: string; userRole: string };
    params: Params;
    body: Body;
}

export interface LoginRequestBody<T> extends Request<unknown, unknown, T> {
    body: T;
}
