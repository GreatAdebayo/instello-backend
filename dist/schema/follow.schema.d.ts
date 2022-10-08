import * as mongoose from 'mongoose';
export declare const FollowSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    following?: {
        userName: string;
        id?: mongoose.Types.ObjectId;
        profilePicture?: string;
    };
    follower?: {
        userName: string;
        id?: mongoose.Types.ObjectId;
        profilePicture?: string;
    };
}>;
