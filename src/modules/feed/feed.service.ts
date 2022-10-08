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
        private readonly middlewareService: MiddleWareService) { }



    private async fetchFeeds(userid: Types.ObjectId) {
        try {
            //get personal timeline posts
            const personal = await this.postModel.find({ userid, type: "timeline" })


            //get followers and following 
            const [followings, followers] = await Promise.all([this.followModel.find({ "follower.id": userid }).select("following"),
            this.followModel.find({ "following.id": userid }).select("follower")])



            const followersIds = [];
            const followindIds = [];
            if (followings.length > 0 && followers.length > 0) {
                ((callback) => {
                    followers.forEach((follower, followerindex) => {
                        followersIds.push(follower.follower.id)

                        if (followerindex == followers.length - 1) {
                            // // console.log(followersIds)
                            // followings.forEach((following, followingindex) => {
                            //     followindIds.push(following.following.id)
                            //     console.log(followersIds)
                            //     if (followingindex == followings.length - 1 || followings.length === 0)
                            //         console.log(followersIds)
                            // })
                        }
                    })
                })((a, b) => {
                    console.log(a)
                    console.log(b)
                })
            } else {
                return {
                    message: "timeline fetched",
                    status: 200,
                    isSuccess: true,
                    data: personal
                }
            }

            // fetchIds(() => {

            // })

            // const followersTimeline = await this.postModel.find({ 'user': { $in: followers } })
            // console.log(followersTimeline)


            // extract following ids
            // const followingIds = []

            // following.forEach(async (follow, index) => {
            //     followingIds.push(follow.following.id)

            //     if (index == following.length - 1) {
            //         //get following timeline posts
            //         const followingTimeline = await this.postModel.find({ 'user': { $in: followingIds }, type: "timeline" })
            //         console.log(followingTimeline)
            //     }
            // })





        } catch (error) {
            console.log(error)
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }

    }





    async feeds(userid: Types.ObjectId) {
        try {
            const user = await this.middlewareService.checkUserExists(userid)
            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }
            const feeds = await this.fetchFeeds(userid)
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }
}
