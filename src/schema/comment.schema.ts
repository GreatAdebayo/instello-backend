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

        by: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    { timestamps: true }
);