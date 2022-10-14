import * as mongoose from 'mongoose';
export declare const CommentSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    user: mongoose.Types.ObjectId;
    post: mongoose.Types.ObjectId;
    content: string;
}>;
