import { UserDto } from 'src/modules/signup/dto/user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Types } from "mongoose"
import { MiddleWareService } from '../middlewares/middleware.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostDto } from '../post/dto/post.dto';
import { CommentDto } from '../comment/dto/comment.dto';
import { FollowDto } from '../user/dto/follow.dto';





@Injectable()
export class FeedService {
    constructor(@InjectModel('Post') private readonly postModel: Model<PostDto>,
        @InjectModel('Comment') private readonly commentModel: Model<CommentDto>,
        @InjectModel('Follow') private readonly followModel: Model<FollowDto>,
        @InjectModel('PostMedia') private readonly postMediaModel: Model<any>,
        @InjectModel('User') private readonly userModel: Model<UserDto>,
        private readonly middlewareService: MiddleWareService) { }



    async feeds() {
        try {
            const feeds = await this.postModel.find().populate([
                {
                    path: "user",
                    model: "User",
                    select: { 'userName': 1, 'email_verified': 1, 'profilePicture': 1 }

                },
                {
                    path: "medias",
                    model: "PostMedia",

                },

            ]
            ).sort({
                createdAt: 'descending'
            })

            if (!feeds.length) return {
                message: "no feeds found",
                status: 400,
                isSuccess: false

            }
            return {
                message: "feeds fetched",
                status: 200,
                isSuccess: true,
                data: feeds
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
