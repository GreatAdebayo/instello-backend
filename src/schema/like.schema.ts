import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LikeSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        username: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);