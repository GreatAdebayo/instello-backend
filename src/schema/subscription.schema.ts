import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const SubscriptionSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        subscriber: {
            type: Schema.Types.ObjectId,
            required: true,
        },

        mode: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);