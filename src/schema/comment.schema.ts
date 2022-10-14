import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CommentSchema = new Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },

        content: {
            type: String,
            required: true,
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);