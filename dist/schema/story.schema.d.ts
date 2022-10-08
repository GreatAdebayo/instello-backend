import * as mongoose from 'mongoose';
export declare const StorySchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    user: mongoose.Types.ObjectId;
    views: {
        type?: mongoose.Types.ObjectId;
        ref?: unknown;
    }[];
    media?: {
        url: string;
        cloudinary_id: string;
        format: string;
    };
}>;
