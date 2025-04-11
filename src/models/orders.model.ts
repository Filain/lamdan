import mongoose from 'mongoose';

const ordersSchema = new mongoose.Schema(
    {
        name: { type: String },
        surname: { type: String, default: null },
        email: { type: String, default: null, unique: true },
        phone: { type: String, default: null },
        age: { type: Number, default: null },
        course: { type: String, default: null },
        course_format: { type: String, default: null },
        course_type: { type: String, default: null },
        sum: { type: Number, default: null },
        already_paid: { type: Number, default: null },
        created_at: { type: Date, default: Date.now },
        utm: { type: String, default: null },
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
