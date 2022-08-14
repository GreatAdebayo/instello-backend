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
        media: {
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
        ]
    },
    { timestamps: true }
);


