import mongoose from 'mongoose';

import { RoleEnum } from '../enums/role.enum';
import { regexConstant } from '../constants/regex.constant';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        surname: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [regexConstant.EMAIL, 'Please use a valid email address'],
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: RoleEnum,
            default: RoleEnum.MANAGER,
        },
        isActive: {
            type: Boolean,
            default: false,
        },
        isBanned: {
            type: Boolean,
            default: false,
        },
        lastLogin: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true, versionKey: false },
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
