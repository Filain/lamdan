import mongoose from 'mongoose';

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
            match: [
                /^[\w-\.]+@([\w-]+\.)+[a-zA-Z]{2,}$/,
                'Please use a valid email address',
            ],
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ['manager', 'admin'],
            default: 'manager',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        isBanned: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true, versionKey: false },
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
