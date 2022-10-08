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
    private readonly middlewareService;
    constructor(postModel: Model<PostDto>, commentModel: Model<CommentDto>, followModel: Model<FollowDto>, middlewareService: MiddleWareService);
    private fetchFeeds;
    feeds(userid: Types.ObjectId): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
    }>;
}
