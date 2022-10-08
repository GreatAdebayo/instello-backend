import * as mongoose from 'mongoose';
export declare const LikeSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    user: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    username: string;
}>;
