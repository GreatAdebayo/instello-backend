import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from 'src/signup/dto/signup.dto';
import { FollowDto } from './dto/follow.dto';
import { ResponseDto } from './dto/response.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<SignUpDto>,
        @InjectModel('Follow') private readonly followModel: Model<FollowDto>,
        @InjectModel('Post') private readonly postModel: Model<FollowDto>) { }//change later to postdto

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

            //fetch number of follower
            const followers = await this.followModel.find({ "following.id": userid });
            user.noOfFollowers = followers.length;

            //fetch number of following
            const following = await this.followModel.find({ "follower.id": userid });
            user.noOfFollowing = following.length

            //fetch number of post
            const posts = await this.postModel.find({ user: userid })
            user.noOfPosts = posts.length
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
