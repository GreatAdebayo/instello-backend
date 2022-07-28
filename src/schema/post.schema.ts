import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const PostSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { timestamps: true }
);