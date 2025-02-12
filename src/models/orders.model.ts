import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String, required: true },
        age: { type: Number, required: true },
        course: { type: String, required: true },
        course_format: { type: String, required: true },
        course_type: { type: String, required: true },
        sum: { type: Number, default: null },
        already_paid: { type: Number, default: null },
        created_at: { type: Date, default: Date.now },
        utm: { type: String, default: '' },
        msg: { type: String, default: null },
        status: { type: String, default: null },
        manager: {
            type: String,
            default: null,
        },
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
            default: null,
        },
        comment: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Comment',
            },
        ],
    },
    { timestamps: false, versionKey: false },
);

const ordersModel = mongoose.model('Orders', ordersSchema);

export default ordersModel;
