import { CACHE_MANAGER, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
import { FollowDto } from './dto/follow.dto';
import { Cache } from 'cache-manager'
import { PostDto } from 'src/modules/post/dto/post.dto';
import { Types } from 'mongoose'



@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDto>,
        @InjectModel('Follow') private readonly followModel: Model<FollowDto>,
        @InjectModel('Post') private readonly postModel: Model<PostDto>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) { }



    private async fetchDetails(userid: Types.ObjectId, user: UserDto) {
        try {
            const [followers, following, posts] = await Promise.all([this.followModel.find({ "following.id": userid }).select("-following"),
            this.followModel.find({ "follower.id": userid }).select("-follower"), this.postModel.find({ user: userid }), this.cacheManager.set("private_user_info", user)])
            return {
                followers, following, posts
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }



    async privateUserInfo(userid: Types.ObjectId) {
        try {
            //check user and fetch cached user info
            const [user, cachedItem] = await Promise.all([this.userModel.findById(userid).select(`-password -createdAt -updatedAt 
            -ip -device_verified`), this.cacheManager.get("private_user_info")])

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }


            if (cachedItem) return {
                message: "user info succefully fetched",
                status: 200,
                isSuccess: true,
                data: cachedItem
            }


            //fetch number of follower, following, posts and cache user data
            const { followers, posts, following } = await this.fetchDetails(userid, user)

            user.followers = followers;


            user.following = following;


            user.noOfposts = posts.length;


            return {
                message: "user info succefully fetched",
                status: 200,
                isSuccess: true,
                data: user
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }





    async publicUserInfo(username: string) {
        try {
            //check user and fetch cached user info
            const [user, cachedItem] = await Promise.all([this.userModel.findOne({ userName: username }).select(`-password -createdAt -updatedAt 
             -ip -device_verified`), this.cacheManager.get("private_user_info")])

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }


            if (cachedItem) return {
                message: "user info succefully fetched",
                status: 200,
                isSuccess: true,
                data: cachedItem
            }


            //fetch number of follower, following, posts and cache user data
            const { followers, posts, following } = await this.fetchDetails(user._id, user)

            user.followers = followers;


            user.following = following;


            user.noOfposts = posts.length;


            return {
                message: "user info succefully fetched",
                status: 200,
                isSuccess: true,
                data: user
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }



    async searchUser({ page, limit, username }: { page: number, limit: number, username: string }) {
        try {
            //filter out usernames that matches search query
            const users = await this.userModel.find({ "userName": { $regex: '.*' + username + '.*', $options: 'i' } })
                .limit(limit || 5)
                .skip((page - 1) * limit || 0)
                .sort("asc").select(`-firstName -lastName -password -createdAt -updatedAt 
        -ip -device_verified -following -followers -email -email_verified`)

            if (users.length < 1)
                return {
                    message: "no user found",
                    status: 400,
                    isSuccess: false
                }

            return {
                message: "users succefully fetched",
                status: 200,
                isSuccess: true,
                data: users
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }

    }
}


