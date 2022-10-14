import * as mongoose from 'mongoose';
export declare const PostSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    user: mongoose.Types.ObjectId;
    mode: string;
    medias: {
        type?: mongoose.Types.ObjectId;
        ref?: unknown;
    }[];
    comments: {
        type?: mongoose.Types.ObjectId;
        ref?: unknown;
    }[];
    likes: {
        type?: mongoose.Types.ObjectId;
        ref?: unknown;
    }[];
    caption?: string;
}>;
