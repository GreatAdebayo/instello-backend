import * as mongoose from 'mongoose';
export declare const VerificationCodeSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    user: mongoose.Types.ObjectId;
    code: number;
    exp: Date;
}>;
