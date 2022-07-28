import * as mongoose from 'mongoose';
export declare const FollowSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    follower: string;
    following: string;
    profilePicture?: string;
}>;
