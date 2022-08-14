import * as mongoose from 'mongoose';
export declare const PostSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    user: mongoose.Types.ObjectId;
    comment: {
        type?: mongoose.Types.ObjectId;
        ref?: unknown;
    }[];
    like: {
        type?: mongoose.Types.ObjectId;
        ref?: unknown;
    }[];
    caption?: string;
    media?: {
        url: string;
        cloudinary_id: string;
        format: string;
    };
}>;
