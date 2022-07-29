import { Controller, Get, Post, UseGuards, Request, Res } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';



@Controller('api/post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get()
    async getPost(@Request() req, @Res() res) {
        const response = await this.postService.getPost(req.user.id)
        return res.status(response.status).json(response)
    }

    @UseGuards(AuthGuard('jwt'))
    @Post()
    async createPost() { }
}
