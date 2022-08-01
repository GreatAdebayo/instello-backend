import { Model } from 'mongoose';
import { UserDto } from 'src/signup/dto/user.dto';
import { PostDto } from './dto/post.dto';
import { Cache } from 'cache-manager';
export declare class PostService {
    private readonly userModel;
    private readonly postModel;
    private readonly commentModel;
    private readonly cacheManager;
    constructor(userModel: Model<UserDto>, postModel: Model<PostDto>, commentModel: Model<PostDto>, cacheManager: Cache);
    getPrivatePost(userid: string): Promise<{
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
    createPost(): Promise<void>;
}
