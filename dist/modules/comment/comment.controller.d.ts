import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { Types } from 'mongoose';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    postComment(body: CommentDto, postid: Types.ObjectId, req: any, res: any): Promise<any>;
    deletePost({ comid, postid }: {
        comid: any;
        postid: any;
    }, req: any, res: any): Promise<any>;
}
