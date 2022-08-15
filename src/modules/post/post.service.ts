import { CACHE_MANAGER, Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
import { PostDto } from './dto/post.dto';
import { Cache } from 'cache-manager'
import { SubscriptionDto } from './dto/subscription.dto';
import { Types } from "mongoose"
import { MiddleWareService } from '../middlewares/middleware.service';
import { CommentDto } from '../comment/dto/comment.dto';
import { LikeDto } from './dto/like.dto';




@Injectable()
export class PostService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDto>,
        @InjectModel('Post') private readonly postModel: Model<PostDto>,
        @InjectModel('Comment') private readonly commentModel: Model<CommentDto>,
        @InjectModel('Subscription') private readonly subscriptionModel: Model<SubscriptionDto>,
        @InjectModel('Like') private readonly likeModel: Model<LikeDto>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly middlewareService: MiddleWareService) { }





    private async getPosts({ userid, limit }: { userid: Types.ObjectId, limit: number }) {
        try {
            //fetch posts and populate comments
            const posts = await this.postModel.find({ user: userid }).populate([
                {
                    path: "comments",
                    model: "Comment",
                    options: {
                        limit: limit || 8
                    }
                },
                {
                    path: "likes",
                    model: "Like"
                }
            ]

            ).limit(limit || 8) as any

            return posts

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }




    async getPrivatePost({ userid, limit }: { userid: Types.ObjectId, limit: number }) {
        try {
            // check if user exists and fetch cached user info
            const [user, cachedItem] = await Promise.all([this.middlewareService.checkUserExists(userid), this.cacheManager.get("private_user_post")])

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }


            if (cachedItem) return {
                message: "posts succefully fetched",
                status: 200,
                isSuccess: true,
                data: cachedItem
            }



            //fetch posts and populate comments and likes
            const posts = await this.getPosts({ userid, limit })

            if (posts.length < 1)
                return {
                    message: "no post yet",
                    status: 200,
                    isSuccess: false
                }



            //cache user posts
            await this.cacheManager.set("private_user_post", posts)


            return {
                message: "posts succefully fetched",
                status: 200,
                isSuccess: true,
                data: posts
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }








    async getPublicPost({ userid, username, limit }: { userid: Types.ObjectId, username: string, limit: number }) {
        try {
            //check if logged in user exists and if username exists
            const [user, userName] = await Promise.all([this.middlewareService.checkUserExists(userid), this.userModel.findOne({ userName: username })])
            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }


            if (!userName) return {
                message: "username not found",
                status: 400,
                isSuccess: false
            }


            //check if subscription mode is enabled
            if (userName.subscription.mode) {
                if (await this.middlewareService.checkSubscription({ userid, userNameId: userName._id })) {
                    const [posts, cachedItem] = await Promise.all([this.getPosts({ userid: userName._id, limit }), this.cacheManager.get("public_user_post")])

                    if (posts.length < 1)
                        return {
                            message: "no post yet",
                            status: 200,
                            isSuccess: false
                        }


                    if (cachedItem) return {
                        message: "posts succefully fetched",
                        status: 200,
                        isSuccess: true,
                        data: cachedItem
                    }


                    //cache user posts
                    await this.cacheManager.set("public_user_post", posts)

                    return {
                        message: "posts succefully fetched",
                        status: 200,
                        isSuccess: true,
                        data: posts
                    }
                } else {
                    return {
                        message: "you are not in the subscription list",
                        status: 400,
                        isSuccess: false
                    }
                }

            } else {
                return await this.getPosts({ userid: userName._id, limit })
            }

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }






    async uploadPost(userid: Types.ObjectId, { caption }: PostDto, file: Express.Multer.File) {
        try {
            //check if user exists
            const user = await this.middlewareService.checkUserExists(userid)

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }

            const response = await this.middlewareService.fileValidationAndUploader(file, process.env.POST)

            if (response.type == 'format')
                return {
                    message: response.message,
                    status: 400,
                    isSuccess: false
                }

            if (response.type == 'size')
                return {
                    message: response.message,
                    status: 400,
                    isSuccess: false
                }

            if (response.type == 'upload') {
                const { secure_url, public_id } = response.data

                // save  new post
                const post = new this.postModel({
                    user: userid,
                    caption,
                    media: {
                        url: secure_url,
                        cloudinary_id: public_id,
                        format: file.mimetype
                    }
                })
                await post.save();

                return {
                    message: 'post successfully uploaded',
                    status: 200,
                    isSuccess: true
                }

            }

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }

    }





    async deletePost(postid: Types.ObjectId, userid: Types.ObjectId) {
        try {
            //check if user exists
            const user = await this.middlewareService.checkUserExists(userid)

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }



            //check if post exists and user owns it
            const post = await this.postModel.findOne({ _id: postid, user: userid })
            if (!post) return {
                message: "post not found",
                status: 400,
                isSuccess: false
            }

            // delete the post
            await this.postModel.deleteOne({ _id: postid })

            return {
                message: "post deleted",
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






    async likePost(postid: Types.ObjectId, userid: Types.ObjectId) {
        try {
            //check if user exists
            const user = await this.middlewareService.checkUserExists(userid)

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }

            //check if post exists
            let post = await this.postModel.findOne({ _id: postid }) as any
            if (!post) return {
                message: "post not found",
                status: 400,
                isSuccess: false
            }


            //check if user already liked post
            const check = await this.likeModel.findOne({ user: userid, post: postid })
            if (check) return {
                message: "post already liked by you",
                status: 400,
                isSuccess: false
            }


            let like = new this.likeModel({
                post: postid,
                username: user.userName,
                user: userid
            })

            like = await like.save()

            post.likes.push(like._id)


            await post.save()


            return {
                message: "post liked",
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

}

