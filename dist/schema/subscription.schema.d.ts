import * as mongoose from 'mongoose';
export declare const SubscriptionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    mode: string;
    user: mongoose.Types.ObjectId;
    subscriber: mongoose.Types.ObjectId;
}>;
