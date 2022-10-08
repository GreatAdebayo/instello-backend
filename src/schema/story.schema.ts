import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const StorySchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
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
        views: [
            {
                type: Schema.Types.ObjectId,
                ref: "StoryView",
            },
        ]
    },
    { timestamps: true }
);


