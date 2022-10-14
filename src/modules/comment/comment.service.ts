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
            //check if user exists
            const user = await this.middlewareService.checkUserExists(userid);
            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }


            //check if post exists
            const post = await this.postModel.findOne({ _id: postid }) as any
            if (!post) return {
                message: "post not found",
                status: 400,
                isSuccess: false
            }


            let postComment = new this.commentModel({
                user: userid,
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




    async deleteComment(comid: Types.ObjectId, postid: Types.ObjectId, userid: Types.ObjectId) {
        try {
            //check if user exists
            const user = await this.middlewareService.checkUserExists(userid)

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }



            //check if comment exists and user owns it
            const post = await this.commentModel.findOne({ _id: comid, user: userid, post: postid })
            if (!post) return {
                message: "comment not found",
                status: 400,
                isSuccess: false
            }

            // delete the post
            await this.commentModel.deleteOne({ _id: comid })


            await this.postModel.findByIdAndUpdate(
                { _id: postid },
                {
                    $pull: {
                        comments: comid,
                    } as any,
                }
            )

            return {
                message: "comment deleted",
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



    async getComments(postid: Types.ObjectId) {
        try {
            //check if post exists
            const post = await this.postModel.findOne({ _id: postid }) as any
            if (!post) return {
                message: "post not found",
                status: 400,
                isSuccess: false
            }

            const comments = await this.commentModel.find({ post: postid }).populate(
                {
                    path: "user",
                    model: "User",
                    select: { 'userName': 1, 'email_verified': 1, 'profilePicture': 1 }

                }
            ).sort({
                createdAt: 'descending'
            })
            if (!comments.length) return {
                message: "no comments",
                status: 400,
                isSuccess: false
            }

            return {
                message: "comments fetched",
                status: 200,
                isSuccess: true,
                data: comments
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
