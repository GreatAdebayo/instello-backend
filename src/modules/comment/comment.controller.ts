import { Body, Controller, Param, Post, UseGuards, Req, Res } from '@nestjs/common';
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
}
