import { CommentDto } from './dto/comment.dto';
import { Model } from 'mongoose';
import { MiddleWareService } from '../middlewares/middleware.service';
import { Types } from 'mongoose';
import { PostDto } from '../post/dto/post.dto';
export declare class CommentService {
    private readonly commentModel;
    private readonly postModel;
    private readonly middlewareService;
    constructor(commentModel: Model<CommentDto>, postModel: Model<PostDto>, middlewareService: MiddleWareService);
    postComment({ content }: CommentDto, postid: Types.ObjectId, userid: Types.ObjectId): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
    }>;
    deleteComment(comid: Types.ObjectId, postid: Types.ObjectId, userid: Types.ObjectId): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
    }>;
    getComments(postid: Types.ObjectId): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: boolean;
        data: Omit<import("mongoose").Document<unknown, any, CommentDto> & CommentDto & {
            _id: Types.ObjectId;
        }, never>[];
    }>;
}
