import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FollowSchema = new Schema({
    following: {
        id: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        profilePicture: {
            type: String
        }
    },
    follower: {
        id: {
            type: Schema.Types.ObjectId
        },
        profilePicture: {
            type: String
        },
        userName: { type: String }
    },
},
    { timestamps: true })