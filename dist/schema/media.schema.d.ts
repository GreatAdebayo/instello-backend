import * as mongoose from 'mongoose';
export declare const MediaSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    type: string;
    post: mongoose.Types.ObjectId;
    url: string;
    cloudinary_id: string;
    format: string;
}>;
