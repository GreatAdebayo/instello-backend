import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String
    },
    bio: {
        type: String,
        default: "Hi there!"
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
    device_verified: {
        type: Boolean,
        default: true
    },
    subscription: {
        mode: {
            type: Boolean,
            default: false
        },
        duration: {
            type: String
        }
    },
    following: [],
    followers: [],
    noOfposts: {
        type: Number
    },
    ip: [
        {
            type: String,
            required: true
        },
    ],

},
    { timestamps: true })