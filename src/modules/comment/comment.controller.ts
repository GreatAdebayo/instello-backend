import { Body, Controller, Param, Post, UseGuards, Req, Res, Delete, Request, Get } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { Types } from 'mongoose'
import { ResponseDto } from './../response.dto';



@Controller('api/comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) { }


    @UseGuards(AuthGuard('jwt'))
    @Post('/:id')
    async postComment(@Body() body: CommentDto, @Param("id") postid: Types.ObjectId, @Req() req, @Res() res) {
        const response: ResponseDto = await this.commentService.postComment(body, postid, req.user.id);
        return res.status(response.status).json(response)
    }



    @UseGuards(AuthGuard('jwt'))
    @Delete('/:comid/:postid')
    async deleteComment(@Param() { comid, postid }, @Request() req, @Res() res) {
        const response: ResponseDto = await this.commentService.deleteComment(comid, postid, req.user.id)
        return res.status(response.status).json(response)
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/:id')
    async getComments(@Param("id") postid: Types.ObjectId, @Res() res) {
        const response: ResponseDto = await this.commentService.getComments(postid)
        return res.status(response.status).json(response)
    }

}
