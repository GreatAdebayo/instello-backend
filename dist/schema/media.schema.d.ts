import * as mongoose from 'mongoose';
export declare const PostMediaSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    post: mongoose.Types.ObjectId;
    url: string;
    cloudinary_id: string;
    format: string;
}>;
