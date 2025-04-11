import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema(
    {
        comment: {
            type: String,
            required: true,
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Order',
            required: true,
        },
        commentedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    { timestamps: true },
);

const commentModel = mongoose.model('Comment', commentSchema);

export default commentModel;
