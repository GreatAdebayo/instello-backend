import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
import { FollowDto } from './dto/follow.dto';
import { Cache } from 'cache-manager';
import { PostDto } from 'src/modules/post/dto/post.dto';
export declare class UserService {
    private readonly userModel;
    private readonly followModel;
    private readonly postModel;
    private readonly cacheManager;
    constructor(userModel: Model<UserDto>, followModel: Model<FollowDto>, postModel: Model<PostDto>, cacheManager: Cache);
    privateUserInfo(userid: string): Promise<{
        message: string;
        status: number;
        isSuccess: false;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: true;
        data: unknown;
    }>;
    publicUserInfo(username: string): Promise<{
        message: string;
        status: number;
        isSuccess: false;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: true;
        data: unknown;
    }>;
    searchUser({ page, limit, username }: {
        page: number;
        limit: number;
        username: string;
    }): Promise<{
        message: string;
        status: number;
        isSuccess: false;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: true;
        data: (import("mongoose").Document<unknown, any, UserDto> & UserDto & {
            _id: import("mongoose").Types.ObjectId;
        })[];
    }>;
}
