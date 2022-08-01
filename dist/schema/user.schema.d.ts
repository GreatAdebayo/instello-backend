import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    bio: string;
    email_verified: boolean;
    device_verified: boolean;
    following: mongoose.Types.DocumentArray<any> | any[];
    followers: mongoose.Types.DocumentArray<any> | any[];
    ip: {
        type?: string;
        required?: unknown;
    }[];
    profilePicture?: string;
    noOfposts?: number;
}>;
