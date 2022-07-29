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
            const cachedItem = await this.cacheManager.get("user_info")

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
            await this.cacheManager.set("user_info", user)
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
}
