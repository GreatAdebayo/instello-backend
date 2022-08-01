import { CACHE_MANAGER, ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/signup/dto/user.dto';
import { FollowDto } from './dto/follow.dto';
import { ResponseDto } from './dto/response.dto';
import { Cache } from 'cache-manager'
import { PostDto } from 'src/post/dto/post.dto';
@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDto>,
        @InjectModel('Follow') private readonly followModel: Model<FollowDto>,
        @InjectModel('Post') private readonly postModel: Model<PostDto>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }


    async privateUserInfo(userid: string) {
        let response: ResponseDto;
        try {
            const user = await this.userModel.findById(userid).select(`-password -createdAt -updatedAt 
            -ip -device_verified`);
            if (!user) return response = {
                message: "user not found",
                status: 400,
                isSuccess: false
            }

            //fetch cached user info
            const cachedItem = await this.cacheManager.get("private_user_info")

            if (cachedItem) return response = {
                message: "user info succefully fetched",
                status: 200,
                isSuccess: true,
                data: cachedItem
            }

            //fetch number of follower
            const followers = await this.followModel.find({ "following.id": userid }).select("-following");
            user.followers = followers;

            //fetch number of following
            const following = await this.followModel.find({ "follower.id": userid }).select("-follower");
            user.following = following;


            //fetched number of posts
            const posts = await this.postModel.find({ user: userid })
            user.noOfposts = posts.length;


            //cache user data
            await this.cacheManager.set("private_user_info", user)
            return response = {
                message: "user info succefully fetched",
                status: 200,
                isSuccess: true,
                data: user
            }
        } catch (error) {
            throw new ForbiddenException('something is wrong!')
        }
    }



    async publicUserInfo(username: string) {
        let response: ResponseDto;
        try {
            const user = await this.userModel.findOne({ userName: username }).select(`-password -createdAt -updatedAt 
            -ip -device_verified -email_verified`);
            if (!user) return response = {
                message: "user not found",
                status: 400,
                isSuccess: false
            }

            //fetch cached user info
            const cachedItem = await this.cacheManager.get("public_user_info")

            if (cachedItem) return response = {
                message: "user info succefully fetched",
                status: 200,
                isSuccess: true,
                data: cachedItem
            }

            //fetch number of follower
            const followers = await this.followModel.find({ "following.id": user._id }).select("-following");
            user.followers = followers;

            //fetch number of following
            const following = await this.followModel.find({ "follower.id": user._id }).select("-follower");
            user.following = following;


            //fetched number of posts
            const posts = await this.postModel.find({ user: user._id })
            user.noOfposts = posts.length;


            //cache user data
            await this.cacheManager.set("public_user_info", user)
            return response = {
                message: "user info succefully fetched",
                status: 200,
                isSuccess: true,
                data: user
            }
        } catch (error) {
            throw new ForbiddenException('something is wrong!')
        }
    }



    async searchUser({ page, limit, username }: { page: number, limit: number, username: string }) {
        let response: ResponseDto;
        //filter out usernames that matches search query
        const users = await this.userModel.find({ "userName": { $regex: '.*' + username + '.*', $options: 'i' } })
            .limit(limit || 5)
            .skip((page - 1) * limit || 0)
            .sort("asc").select(`-firstName -lastName -password -createdAt -updatedAt 
            -ip -device_verified -following -followers -email -email_verified`)
        if (users.length < 1)
            return response = {
                message: "no user found",
                status: 400,
                isSuccess: false
            }

        return response = {
            message: "users succefully fetched",
            status: 200,
            isSuccess: true,
            data: users
        }

    }
}


