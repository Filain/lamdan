import dotenv from 'dotenv';

dotenv.config();

export const config = {
    port: process.env.PORT || 5002,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_NAME,
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '10'),
    jwt_secret: process.env.JWT_SECRET || 'secret',

    jwt_access_expires: process.env.JWT_ACCESS_EXPIRES || '15min',
    jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES || '1d',

    jwt_action_expires: process.env.JWT_ACTION_EXPIRES || '30min',

    cookie_access_expires: process.env.JWT_ACCESS_EXPIRES
        ? +(process.env.JWT_ACCESS_EXPIRES + 1 * 60 * 1000)
        : 24 * 60 * 60 * 1000,

    cookie_refresh_expires: process.env.JWT_REFRESH_EXPIRES
        ? +(process.env.JWT_REFRESH_EXPIRES + 1 * 60 * 1000)
        : 24 * 60 * 60 * 1000,

    cookie_action_expires: process.env.COOKIE_ACTION_EXPIRES
        ? +process.env.COOKIE_ACTION_EXPIRES
        : 15 * 60 * 1000,
    cookie_email_verification_expires: process.env
        .COOKIE_EMAIL_VERIFICATION_EXPIRES
        ? +process.env.COOKIE_EMAIL_VERIFICATION_EXPIRES
        : 15 * 60 * 1000,
    cookie_sameSite: process.env.COOKIE_SAMESITE || 'strict',
    cookie_secure: process.env.COOKIE_SECURE === 'true' ? true : false,
    email_user: process.env.EMAIL_USER || 'project.for.test.and@gmail.com',
    email_password: process.env.EMAIL_PASSWORD || 'hpsl saqz yvmg jbkt',
};
