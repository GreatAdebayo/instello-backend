import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    bio: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    email_verified: boolean;
    device_verified: boolean;
    ip: {
        type?: string;
        required?: unknown;
    }[];
    profilePicture?: string;
}>;
