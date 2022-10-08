import * as mongoose from 'mongoose';
export declare const PostSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    type: string;
    user: mongoose.Types.ObjectId;
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
