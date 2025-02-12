import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
    {
        group: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true },
);

const groupModel = mongoose.model('Group', groupSchema);

export default groupModel;
