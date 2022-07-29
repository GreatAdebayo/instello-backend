import { Model } from 'mongoose';
import { UserDto } from 'src/signup/dto/user.dto';
import { FollowDto } from './dto/follow.dto';
import { Cache } from 'cache-manager';
export declare class UserService {
    private readonly userModel;
    private readonly followModel;
    private readonly postModel;
    private readonly cacheManager;
    constructor(userModel: Model<UserDto>, followModel: Model<FollowDto>, postModel: Model<FollowDto>, cacheManager: Cache);
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
}
