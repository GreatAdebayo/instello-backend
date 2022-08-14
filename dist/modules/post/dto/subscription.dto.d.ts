import { Types } from "mongoose";
export declare class SubscriptionDto {
    user: Types.ObjectId;
    subscriber: Types.ObjectId;
    mode: string;
}
