import { CACHE_MANAGER, Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
import { FollowDto } from './dto/follow.dto';
import { Cache } from 'cache-manager'
import { PostDto } from 'src/modules/post/dto/post.dto';
import { Types } from 'mongoose'
import { MiddleWareService } from '../middlewares/middleware.service';


@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDto>,
        @InjectModel('Follow') private readonly followModel: Model<FollowDto>,
        @InjectModel('Post') private readonly postModel: Model<PostDto>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly middlewareService: MiddleWareService
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


            //cache user posts
            await this.cacheManager.set("private_user_info", user)

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
             -ip -device_verified`), this.cacheManager.get("public_user_info")])

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


            //cache user posts
            await this.cacheManager.set("public_user_info", user)

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




    async followUser(username: string, userid: Types.ObjectId) {
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



            //check if already following username
            const check = await this.followModel.findOne({ "following.id": userName._id, "follower.id": userid })


            if (check)
                return {
                    message: `you are already following ${userName.userName}`,
                    status: 400,
                    isSuccess: false
                }


            const follow = new this.followModel({
                following: {
                    id: userName._id,
                    profilePicture: userName.profilePicture,
                    userName: userName.userName
                },
                follower: {
                    id: userid,
                    profilePicture: user.profilePicture,
                    userName: user.userName
                }
            })

            await follow.save()


            return {
                message: `you are now following ${userName.userName}`,
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







    async unfollowUser(username: string, id: Types.ObjectId, userid: Types.ObjectId) {
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


            //check if the user logged in and the username have relationship
            const check = await this.followModel.findOne({ _id: id, "following.id": userName._id, "follower.id": userid })
            if (!check)
                return {
                    message: "no relationship",
                    status: 400,
                    isSuccess: false
                }


            await this.followModel.deleteOne({ _id: id });

            return {
                message: `you have unfollowed ${username}`,
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


