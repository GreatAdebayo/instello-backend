import * as mongoose from 'mongoose';
export declare const CommentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    post: mongoose.Types.ObjectId;
    content: string;
    username: string;
}>;
