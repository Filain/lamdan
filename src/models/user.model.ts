import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {
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
            enum: ['user', 'admin'],
            default: 'user',
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Orders',
            },
        ],
    },
    { timestamps: true },
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
