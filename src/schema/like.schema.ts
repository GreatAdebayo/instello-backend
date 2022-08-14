import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const LikeSchema = new Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        by: {
            type: Schema.Types.ObjectId,
            required: true,
        }
    },
    { timestamps: true }
);