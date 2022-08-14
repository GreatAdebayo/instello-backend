import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MiddleWareService } from '../middlewares/middleware.service';
import { Types } from 'mongoose'
import { PostDto } from '../post/dto/post.dto';



@Injectable()
export class CommentService {
    constructor(@InjectModel('Comment') private readonly commentModel: Model<CommentDto>,
        @InjectModel('Post') private readonly postModel: Model<PostDto>,
        private readonly middlewareService: MiddleWareService) { }



    async postComment({ content }: CommentDto, postid: Types.ObjectId, userid: Types.ObjectId) {
        try {
            const user = await this.middlewareService.checkUserExists(userid);
            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }


            //check if post exists and user owns it
            const post = await this.postModel.findOne({ _id: postid, user: userid }) as any
            if (!post) return {
                message: "post not found",
                status: 400,
                isSuccess: false
            }


            let postComment = new this.commentModel({
                username: user.userName,
                content,
                post: postid
            })

            postComment = await postComment.save()

            post.comments.push(postComment._id)

            await post.save()

            return {
                message: "comment posted",
                status: 200,
                isSuccess: true
            }


        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }




    async deleteComment() { }
}
