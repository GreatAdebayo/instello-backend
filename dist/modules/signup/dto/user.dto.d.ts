import { FollowDto } from "src/modules/user/dto/follow.dto";
interface SubscriptionMode {
    mode: boolean;
    duration: string;
}
export declare class UserDto {
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    ip: string[];
    email_verified: boolean;
    device_verified: boolean;
    followers: FollowDto[];
    following: FollowDto[];
    noOfposts: number;
    subscription: SubscriptionMode;
    profilePicture: string;
    website: string;
    occupation: string;
    bio: string;
    gender: string;
}
export {};
