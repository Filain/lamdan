import { Request } from 'express';

import { IOrderQuery } from './order.interfaces';

// interface CustomRequest extends Request {
//     user?: { userId: string; userRole: string };
// }
//
// export interface CustomBody2Request<T> extends Request {
//     body: T;
//     user?: { userId: string }; // Додай user, якщо використовуєш авторизацію
// }

export interface CustomRequestBody<T> extends Request<unknown, unknown, T> {
    user?: { userId: string }; // Додай user, якщо використовуєш авторизацію
    body: T;
}
// export interface CustomQueryRequest
//     extends Request<ParamsDictionary, unknown, unknown, IOrderQuery> {
//     user?: { userId: string; userRole: string };
// }

export interface CustomQueryRequest extends Request {
    user?: { userId: string };
    query: Record<string, never> & IOrderQuery;
}

// export interface CustomQueryRequestBody<T>
//     extends Request<unknown, unknown, T> {
//     user?: { userId: string };
//     query: { page: string; limit: string; sort: string };
//     body: T;
// }

export interface CustomRequestParams<Params = unknown> extends Request<Params> {
    params: Params;
}

export interface LoginRequestBody<T> extends Request<unknown, unknown, T> {
    body: T;
}
