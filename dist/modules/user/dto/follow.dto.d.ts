import { Types } from "mongoose";
interface Follow {
    id: Types.ObjectId;
    userName: string;
    profilePicture: string;
}
export declare class FollowDto {
    user: Follow;
    follower: Follow;
}
export {};
