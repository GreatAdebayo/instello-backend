import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const VerificationCodeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        code: {
            type: Number,
            required: true,
        },

        exp: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);