import * as mongoose from 'mongoose';
export declare const StoryViewSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    story: mongoose.Types.ObjectId;
    username: string;
}>;
