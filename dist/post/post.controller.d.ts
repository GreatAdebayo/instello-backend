/// <reference types="multer" />
import { PostService } from './post.service';
import { PostDto, PostQuery } from './dto/post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPrivatePost(req: any, res: any, limit?: number): Promise<any>;
    uploadPost(type: PostQuery, body: PostDto, file: Express.Multer.File): Promise<void>;
    getPublicPost(req: any, username: string, res: any): Promise<any>;
}
