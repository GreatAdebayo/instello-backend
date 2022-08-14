import * as mongoose from 'mongoose';
export declare const FollowSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    following?: {
        id: mongoose.Types.ObjectId;
        profilePicture?: string;
    };
    follower?: {
        id?: mongoose.Types.ObjectId;
        userName?: string;
        profilePicture?: string;
    };
}>;
