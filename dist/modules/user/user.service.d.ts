import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
import { FollowDto } from './dto/follow.dto';
import { Cache } from 'cache-manager';
import { PostDto } from 'src/modules/post/dto/post.dto';
import { Types } from 'mongoose';
import { MiddleWareService } from '../middlewares/middleware.service';
export declare class UserService {
    private readonly userModel;
    private readonly followModel;
    private readonly postModel;
    private readonly cacheManager;
    private readonly middlewareService;
    constructor(userModel: Model<UserDto>, followModel: Model<FollowDto>, postModel: Model<PostDto>, cacheManager: Cache, middlewareService: MiddleWareService);
    private fetchDetails;
    privateUserInfo(userid: Types.ObjectId): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: boolean;
        data: import("mongoose").Document<unknown, any, UserDto> & UserDto & {
            _id: Types.ObjectId;
        };
    }>;
    publicUserInfo(username: string): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: boolean;
        data: import("mongoose").Document<unknown, any, UserDto> & UserDto & {
            _id: Types.ObjectId;
        };
    }>;
    searchUser({ page, limit, username }: {
        page: number;
        limit: number;
        username: string;
    }): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: boolean;
        data: (import("mongoose").Document<unknown, any, UserDto> & UserDto & {
            _id: Types.ObjectId;
        })[];
    }>;
    followUser(username: string, userid: Types.ObjectId): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
    }>;
    unfollowUser(username: string, id: Types.ObjectId, userid: Types.ObjectId): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
    }>;
    editProfile({ body, user }: {
        body: any;
        user: any;
    }): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
    }>;
}
