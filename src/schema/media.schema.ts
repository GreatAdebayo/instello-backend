import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PostMediaSchema = new Schema(
    {
        post: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        cloudinary_id: {
            type: String,
            required: true,
        },
        format: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);