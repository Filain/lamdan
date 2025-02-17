import { Request } from 'express';

import { IOrderQuery } from './order.interfaces';

export interface CustomRequest extends Request {
    user?: { userId: string; userRole: string };
}
//
// export interface CustomBody2Request<T> extends Request {
//     body: T;
//     user?: { userId: string }; // Додай user, якщо використовуєш авторизацію
// }

export interface CustomRequestBody<T> extends Request<unknown, unknown, T> {
    user?: { userId: string; userRole: string }; // Додай user, якщо використовуєш авторизацію
    body: T;
}
// export interface CustomQueryRequest
//     extends Request<ParamsDictionary, unknown, unknown, IOrderQuery> {
//     user?: { userId: string; userRole: string };
// }

export interface CustomQueryRequest extends Request {
    user?: { userId: string; userRole: string };
    query: Record<string, never> & IOrderQuery;
}

// export interface CustomQueryRequestBody<T>
//     extends Request<unknown, unknown, T> {
//     user?: { userId: string };
//     query: { page: string; limit: string; sort: string };
//     body: T;
// }

export interface CustomRequestParams<Params = unknown> extends Request<Params> {
    user?: { userId: string; userRole: string };
    params: Params;
}

export interface CustomRequestParamsBody<Params = unknown, Body = unknown>
    extends Request<Params, never, Body> {
    user?: { userId: string; userRole: string }; // Додаткові поля для користувача
    params: Params; // Параметри з URL
    body: Body; // Тіло запиту (наприклад, POST дані)
}

export interface LoginRequestBody<T> extends Request<unknown, unknown, T> {
    body: T;
}
