import joi from 'joi';

import { regexConstant } from '../constants/regex.constant';

export class UserValidator {
    private static username = joi.string().min(2).max(20).trim();
    private static age = joi.number().min(18).max(120);
    private static email = joi
        .string()
        .lowercase()
        .trim()
        .regex(regexConstant.EMAIL);
    private static passwordSingUp = joi
        .string()
        .trim()
        .regex(regexConstant.PASSWORD);
    private static passwordSingIn = joi.string().trim();
    private static phone = joi.string().trim().regex(regexConstant.PHONE);

    public static create = joi.object({
        name: this.username.required(),
        surname: this.username.required(),
        email: this.email.required(),
        password: this.passwordSingUp.required(),
    });

    public static update = joi.object({
        name: this.username,
        age: this.age,
        phone: this.phone,
    });

    public static signIn = joi.object({
        email: this.email.required(),
        password: this.passwordSingIn.required(),
    });

    public static changePassword = joi.object({
        oldPassword: this.passwordSingUp.required(),
        password: this.passwordSingUp.required(),
    });

    public static listQuery = joi.object({
        limit: joi.number().min(1).max(100).default(10),
        page: joi.number().min(1).default(1),
        search: joi.string().trim().lowercase(),
        // order: joi.string().valid(...Object.values(OrderEnum)),
        // orderBy: joi.string().valid(...Object.values(UserListOrderByEnum)),
    });
}
