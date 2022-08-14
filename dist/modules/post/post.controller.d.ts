/// <reference types="multer" />
import { PostService } from './post.service';
import { PostDto } from './dto/post.dto';
import { Types } from 'mongoose';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPrivatePost(req: any, res: any, limit?: number): Promise<any>;
    getPublicPost(req: any, username: string, res: any): Promise<any>;
    uploadPost(body: PostDto, file: Express.Multer.File, req: any, res: any): Promise<any>;
    deletePost(postid: Types.ObjectId, req: any, res: any): Promise<any>;
}
