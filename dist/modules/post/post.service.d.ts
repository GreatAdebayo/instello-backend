import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
import { PostDto } from './dto/post.dto';
import { Cache } from 'cache-manager';
import { SubscriptionDto } from './dto/subscription.dto';
import { Types } from "mongoose";
import { MiddleWareService } from '../middlewares/middleware.service';
import { CommentDto } from '../comment/dto/comment.dto';
import { LikeDto } from './dto/like.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
export declare class PostService {
    private readonly userModel;
    private readonly postModel;
    private readonly commentModel;
    private readonly postMediaModel;
    private readonly subscriptionModel;
    private readonly likeModel;
    private readonly cacheManager;
    private readonly middlewareService;
    private readonly cloudinaryService;
    constructor(userModel: Model<UserDto>, postModel: Model<PostDto>, commentModel: Model<CommentDto>, postMediaModel: Model<any>, subscriptionModel: Model<SubscriptionDto>, likeModel: Model<LikeDto>, cacheManager: Cache, middlewareService: MiddleWareService, cloudinaryService: CloudinaryService);
    private getPosts;
    getPrivatePost(userid: Types.ObjectId, mode: string): Promise<{
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
    newPost(userid: Types.ObjectId, post: PostDto): Promise<{
        message: any;
        status: number;
        isSuccess: boolean;
    }>;
    deletePost(postid: Types.ObjectId, userid: Types.ObjectId): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
    }>;
    likePost(postid: Types.ObjectId, userid: Types.ObjectId): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
    }>;
}
