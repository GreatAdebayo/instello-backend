import { CACHE_MANAGER, Injectable, ForbiddenException, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/signup/dto/user.dto';
import { PostDto } from './dto/post.dto';
import { ResponseDto } from './dto/response.dto';
import { Cache } from 'cache-manager'


@Injectable()
export class PostService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDto>,
        @InjectModel('Post') private readonly postModel: Model<PostDto>,
        @InjectModel('Comment') private readonly commentModel: Model<PostDto>,//change to comment dto 
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache) { }


    async getPost(userid: string) {
        let response: ResponseDto;
        try {
            const user = await this.userModel.findById(userid);
            if (!user) return response = {
                message: "user not found",
                status: 400,
                isSuccess: false
            }

            //fetch cached user info
            const cachedItem = await this.cacheManager.get("user_post")
            if (cachedItem) return response = {
                message: "posts succefully fetched",
                status: 200,
                isSuccess: true,
                data: cachedItem
            }

            //fetch posts and populate comments
            const posts = await this.postModel.find({ user: userid }).populate({
                path: "comment",
                model: "Comment",
            })


            //cache user data
            await this.cacheManager.set("user_post", posts)
            return response = {
                message: "posts succefully fetched",
                status: 200,
                isSuccess: true,
                data: posts
            }
        } catch (error) {
            throw new ForbiddenException('something is wrong!')
        }
    }



    async createPost() { }
}
