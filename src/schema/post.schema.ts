import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PostSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        caption: {
            type: String
        },
        access: {
            type: String,
            required: true
        },
        media: [
            {
                url: String,
                cloudinary_id: String,
            },
        ],
        comment: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        like: [
            {
                type: Schema.Types.ObjectId,
                ref: "Like",
            },
        ],
    },
    { timestamps: true }
);