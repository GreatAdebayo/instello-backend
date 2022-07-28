import *  as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    profilePicture: {
        type: String
    },
    bio: {
        type: String,
        default: "Hi there!"
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
    email_verified: {
        type: Boolean,
        default: false,
    },
    device_verified: {
        type: Boolean,
        default: true
    },
    ip: [
        {
            type: String,
            required: true
        },
    ],

},
    { timestamps: true })