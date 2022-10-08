import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const StoryViewSchema = new Schema(
    {
        story: {
            type: Schema.Types.ObjectId,
            ref: "Story",
            required: true,
        },
        username: {
            type: String,
            required: true,
        }
    },
    { timestamps: true }
);