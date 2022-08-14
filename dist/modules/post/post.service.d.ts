/// <reference types="multer" />
import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
import { PostDto } from './dto/post.dto';
import { Cache } from 'cache-manager';
import { SubscriptionDto } from './dto/subscription.dto';
import { Types } from "mongoose";
import { MiddleWareService } from '../middlewares/middleware.service';
export declare class PostService {
    private readonly userModel;
    private readonly postModel;
    private readonly commentModel;
    private readonly subscriptionModel;
    private readonly cacheManager;
    private readonly middlewareService;
    constructor(userModel: Model<UserDto>, postModel: Model<PostDto>, commentModel: Model<PostDto>, subscriptionModel: Model<SubscriptionDto>, cacheManager: Cache, middlewareService: MiddleWareService);
    getPrivatePost({ userid, limit }: {
        userid: Types.ObjectId;
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
        data: unknown;
    }>;
    private getPosts;
    private checkSubscriptionStatus;
    getPublicPost({ userid, username, limit }: {
        userid: Types.ObjectId;
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
    uploadPost(userid: Types.ObjectId, { caption }: PostDto, file: Express.Multer.File): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
    }>;
    deletePost(postid: Types.ObjectId, userid: Types.ObjectId): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
    }>;
}
