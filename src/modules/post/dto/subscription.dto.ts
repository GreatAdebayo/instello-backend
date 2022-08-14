import { Types } from "mongoose"


export class SubscriptionDto {
    user: Types.ObjectId
    subscriber: Types.ObjectId
    mode: string
}