import { ResponseDto } from './../response.dto';
import { Controller, Get, Post, UseGuards, Request, Res, Param, Query, Body, Delete, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose'




@Controller('api/post')
export class PostController {
    constructor(private readonly postService: PostService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('private')
    async getPrivatePost(@Request() req, @Res() res,
        @Query('limit') limit: number,
        @Query('type') type: string) {
        const response: ResponseDto = await this.postService.getPrivatePost(req.user.id, { limit: 8, type })
        return res.status(response.status).json(response)
    }






    @UseGuards(AuthGuard('jwt'))
    @Get('public/:username')
    async getPublicPost(@Request() req, @Param("username") username: string, @Res() res, @Query("limit") limit: number) {
        const response: ResponseDto = await this.postService.getPublicPost(req.user.id, username, { limit: 8, type: "default" })
        return res.status(response.status).json(response)
    }






    @UseGuards(AuthGuard('jwt'))
    @Post()
    async newPost(@Body() body,
        @Res() res, @Req() req) {
        const response: ResponseDto = await this.postService.newPost(req.user.id, body)
        return res.status(response.status).json(response)
    }






    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async deletePost(@Param("id") postid: Types.ObjectId, @Request() req, @Res() res) {
        const response: ResponseDto = await this.postService.deletePost(postid, req.user.id)
        return res.status(response.status).json(response)
    }




    @UseGuards(AuthGuard('jwt'))
    @Post('like/:id')
    async likePost(@Param("id") postid: Types.ObjectId, @Req() req, @Res() res) {
        const response: ResponseDto = await this.postService.likePost(postid, req.user.id)
        return res.status(response.status).json(response)
    }




    @UseGuards(AuthGuard('jwt'))
    @Get('public/timeline/:username')
    async getPublicTimeLine(@Request() req, @Param("username") username: string, @Res() res, @Query("limit") limit: number) {
        const response: ResponseDto = await this.postService.getPublicTimeLine(req.user.id, username, { limit: 8, type: "timeline" })
        return res.status(response.status).json(response)
    }


}
