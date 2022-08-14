import { ResponseDto } from './../response.dto';
import { Controller, Get, Post, UseGuards, Request, Res, Param, Query, Body, UseInterceptors, UploadedFile, Delete } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './dto/post.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose'




@Controller('api/post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('private')
    async getPrivatePost(@Request() req, @Res() res,
        @Query('limit') limit: number = 8) {
        const response: ResponseDto = await this.postService.getPrivatePost({ userid: req.user.id, limit: 8 })
        return res.status(response.status).json(response)
    }







    @UseGuards(AuthGuard('jwt'))
    @Get('public/:username')
    async getPublicPost(@Request() req, @Param("username") username: string, @Res() res) {
        const response: ResponseDto = await this.postService.getPublicPost({ userid: req.user.id, username, limit: 8 })
        return res.status(response.status).json(response)
    }



    @UseGuards(AuthGuard('jwt'))
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadPost(@Body() body: PostDto, @UploadedFile(
    ) file: Express.Multer.File, @Request() req, @Res() res) {
        const response: ResponseDto = await this.postService.uploadPost(req.user.id, body, file)
        return res.status(response.status).json(response)
    }





    @UseGuards(AuthGuard('jwt'))
    @Delete('delete/:id')
    async deletePost(@Param("id") postid: Types.ObjectId, @Request() req, @Res() res) {
        const response: ResponseDto = await this.postService.deletePost(postid, req.user.id)
        return res.status(response.status).json(response)
    }





}
