import { CACHE_MANAGER, Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
import { GetPostDto, PostDto } from './dto/post.dto';
import { Cache } from 'cache-manager'
import { SubscriptionDto } from './dto/subscription.dto';
import { Types } from "mongoose"
import { MiddleWareService } from '../middlewares/middleware.service';
import { CommentDto } from '../comment/dto/comment.dto';
import { LikeDto } from './dto/like.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';




@Injectable()
export class PostService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDto>,
        @InjectModel('Post') private readonly postModel: Model<PostDto>,
        @InjectModel('Comment') private readonly commentModel: Model<CommentDto>,
        @InjectModel('PostMedia') private readonly postMediaModel: Model<any>,
        @InjectModel('Subscription') private readonly subscriptionModel: Model<SubscriptionDto>,
        @InjectModel('Like') private readonly likeModel: Model<LikeDto>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly middlewareService: MiddleWareService,
        private readonly cloudinaryService: CloudinaryService) { }





    private async getPosts(userid: Types.ObjectId, mode: string) {
        try {
            //fetch posts and populate comments
            const posts = await this.postModel.find({ user: userid, mode }).populate([
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
            return posts

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }




    async getPrivatePost(userid: Types.ObjectId, mode: string) {
        try {
            // check if user exists and fetch cached user info
            const user = await this.middlewareService.checkUserExists(userid)

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }

            //fetch posts
            const posts = await this.getPosts(userid, mode)

            if (posts.length < 1)
                return {
                    message: "no post yet",
                    status: 200,
                    isSuccess: false
                }

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








    // async getPublicPost(userid: Types.ObjectId, username: string, { limit, type }: GetPostDto) {
    //     try {

    //         //check if logged in user exists and if username exists
    //         const [user, userName] = await Promise.all([this.middlewareService.checkUserExists(userid), this.userModel.findOne({ userName: username })])
    //         if (!user) return {
    //             message: "user not found",
    //             status: 400,
    //             isSuccess: false
    //         }


    //         if (!userName) return {
    //             message: "username not found",
    //             status: 400,
    //             isSuccess: false
    //         }



    //         //check if user id is in subscription list
    //         if (await this.middlewareService.checkSubscription({ userid, userNameId: userName._id })) {
    //             const [posts, cachedItem] = await Promise.all([this.getPosts(userid, { limit, type }), this.cacheManager.get("public_user_post")])

    //             if (posts.length < 1)
    //                 return {
    //                     message: "no post yet",
    //                     status: 200,
    //                     isSuccess: false
    //                 }


    //             if (cachedItem) return {
    //                 message: "posts succefully fetched",
    //                 status: 200,
    //                 isSuccess: true,
    //                 data: cachedItem
    //             }


    //             //cache user posts
    //             await this.cacheManager.set("public_user_post", posts)

    //             return {
    //                 message: "posts succefully fetched",
    //                 status: 200,
    //                 isSuccess: true,
    //                 data: posts
    //             }
    //         } else {
    //             return {
    //                 message: "you are not in the subscription list",
    //                 status: 400,
    //                 isSuccess: false
    //             }
    //         }

    //     } catch (error) {
    //         throw new HttpException({
    //             status: HttpStatus.BAD_REQUEST,
    //             error: error.message,
    //         }, HttpStatus.BAD_REQUEST);
    //     }
    // }



    // async getPublicTimeLine(userid: Types.ObjectId, username: string, { limit, type }: GetPostDto) {
    //     try {
    //         //check if logged in user exists and if username exists
    //         const [user, userName] = await Promise.all([this.middlewareService.checkUserExists(userid), this.userModel.findOne({ userName: username })])
    //         if (!user) return {
    //             message: "user not found",
    //             status: 400,
    //             isSuccess: false
    //         }


    //         if (!userName) return {
    //             message: "username not found",
    //             status: 400,
    //             isSuccess: false
    //         }


    //         const [posts, cachedItem] = await Promise.all([this.getPosts(userid, { limit, type }), this.cacheManager.get("public_timeline")])

    //         if (posts.length < 1)
    //             return {
    //                 message: "no post yet",
    //                 status: 200,
    //                 isSuccess: false
    //             }


    //         if (cachedItem) return {
    //             message: "posts succefully fetched",
    //             status: 200,
    //             isSuccess: true,
    //             data: cachedItem
    //         }


    //         //cache user posts
    //         await this.cacheManager.set("public_timeline", posts)

    //         return {
    //             message: "posts succefully fetched",
    //             status: 200,
    //             isSuccess: true,
    //             data: posts
    //         }


    //     } catch (error) {
    //         throw new HttpException({
    //             status: HttpStatus.BAD_REQUEST,
    //             error: error.message,
    //         }, HttpStatus.BAD_REQUEST);
    //     }
    // }





    async newPost(userid: Types.ObjectId, post: PostDto) {
        try {
            //check if user exists
            const user = await this.middlewareService.checkUserExists(userid)

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }

            const response = await this.cloudinaryService.uploadAsset(post.assets, process.env.POST)

            const { data, type } = response

            if (type === "success") {
                // save  new post
                let savePost = new this.postModel({
                    user: userid,
                    caption: post.caption,
                })

                // attach post_id to media and save
                const mediaIds = []
                for (const media of data) {
                    let saveMedia = new this.postMediaModel({
                        ...media,
                        post: savePost._id,
                    })
                    if (media.format === "video") savePost.mode = "video"
                    if (media.format === "image") savePost.mode = "image"
                    await saveMedia.save();
                    savePost.medias = [...savePost.medias, saveMedia._id]
                }

                await savePost.save();

                return {
                    message: 'post successfully uploaded',
                    status: 200,
                    isSuccess: true
                }
            }


            if (type === 'error') {
                return {
                    message: data,
                    status: 400,
                    isSuccess: false
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

