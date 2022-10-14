import * as mongoose from 'mongoose';
export declare const SubscriptionSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    user: mongoose.Types.ObjectId;
    mode: string;
    subscriber: mongoose.Types.ObjectId;
}>;
