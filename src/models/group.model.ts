import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema(
    {
        group: {
            type: String,
            unique: true,
            required: true,
        },
    },
    { timestamps: false, versionKey: false },
);

const groupModel = mongoose.model('Group', groupSchema);

export default groupModel;
