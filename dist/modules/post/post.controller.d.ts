import { PostService } from './post.service';
import { Types } from 'mongoose';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPrivatePost(req: any, res: any, limit: number, mode: string): Promise<any>;
    newPost(body: any, res: any, req: any): Promise<any>;
    deletePost(postid: Types.ObjectId, req: any, res: any): Promise<any>;
    likePost(postid: Types.ObjectId, req: any, res: any): Promise<any>;
}
