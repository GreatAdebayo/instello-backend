import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const FollowSchema = new Schema({
    following: {
        id: {
            type: Schema.Types.ObjectId
        },
        profilePicture: {
            type: String
        },
        userName: {
            type: String,
            required: true,
        }
    },

    follower: {
        id: {
            type: Schema.Types.ObjectId
        },
        profilePicture: {
            type: String
        },
        userName: {
            type: String,
            required: true,
        }
    },
},
    { timestamps: true })