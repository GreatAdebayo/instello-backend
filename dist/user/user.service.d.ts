import { Model } from 'mongoose';
import { SignUpDto } from 'src/signup/dto/signup.dto';
import { FollowDto } from './dto/follow.dto';
export declare class UserService {
    private readonly userModel;
    private readonly followModel;
    private readonly postModel;
    constructor(userModel: Model<SignUpDto>, followModel: Model<FollowDto>, postModel: Model<FollowDto>);
    privateUserInfo(userid: string): Promise<{
        message: string;
        status: number;
        isSuccess: false;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: true;
        data: import("mongoose").Document<unknown, any, SignUpDto> & SignUpDto & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
