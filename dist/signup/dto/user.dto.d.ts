import { FollowDto } from "src/user/dto/follow.dto";
export declare class UserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    userName: string;
    ip: string[];
    email_verified: boolean;
    device_verified: boolean;
    followers: FollowDto[];
    following: FollowDto[];
    noOfposts: number;
}
