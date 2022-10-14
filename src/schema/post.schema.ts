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
        medias: [
            {
                type: Schema.Types.ObjectId,
                ref: "Media"
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: "Like",
            },
        ],

        mode: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);


