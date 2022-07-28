import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    bio: string;
    email_verified: boolean;
    device_verified: boolean;
    ip: {
        type?: string;
        required?: unknown;
    }[];
    userName?: string;
    profilePicture?: string;
    noOfFollowing?: number;
    noOfFollowers?: number;
    noOfPosts?: number;
}>;
