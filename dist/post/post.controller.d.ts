import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    getPrivatePost(req: any, res: any): Promise<any>;
    createPost(): Promise<void>;
    getPublicPost(): Promise<void>;
}
