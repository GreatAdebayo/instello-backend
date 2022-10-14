import { UserDto } from 'src/modules/signup/dto/user.dto';
import { Types } from "mongoose";
import { MiddleWareService } from '../middlewares/middleware.service';
import { Model } from 'mongoose';
import { PostDto } from '../post/dto/post.dto';
import { CommentDto } from '../comment/dto/comment.dto';
import { FollowDto } from '../user/dto/follow.dto';
export declare class FeedService {
    private readonly postModel;
    private readonly commentModel;
    private readonly followModel;
    private readonly postMediaModel;
    private readonly userModel;
    private readonly middlewareService;
    constructor(postModel: Model<PostDto>, commentModel: Model<CommentDto>, followModel: Model<FollowDto>, postMediaModel: Model<any>, userModel: Model<UserDto>, middlewareService: MiddleWareService);
    feeds(): Promise<{
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
}
