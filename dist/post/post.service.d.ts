import { Model } from 'mongoose';
import { UserDto } from 'src/signup/dto/user.dto';
import { PostDto } from './dto/post.dto';
import { Cache } from 'cache-manager';
import { SubscriptionDto } from './dto/subscription.dto';
import { Types } from "mongoose";
export declare class PostService {
    private readonly userModel;
    private readonly postModel;
    private readonly commentModel;
    private readonly subscriptionModel;
    private readonly cacheManager;
    constructor(userModel: Model<UserDto>, postModel: Model<PostDto>, commentModel: Model<PostDto>, subscriptionModel: Model<SubscriptionDto>, cacheManager: Cache);
    getPrivatePost({ userid, limit }: {
        userid: string;
        limit: number;
    }): Promise<{
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
    private getPosts;
    private checkSubscriptionStatus;
    getPublicPost({ userid, username, limit }: {
        userid: string;
        username: string;
        limit: number;
    }): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: boolean;
        data: Omit<import("mongoose").Document<unknown, any, PostDto> & PostDto & {
            _id: Types.ObjectId;
        }, never>[];
    }>;
    uploadPost(): Promise<void>;
}
