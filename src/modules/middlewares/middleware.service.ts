import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
import { Types } from 'mongoose'
import { SubscriptionDto } from "../post/dto/subscription.dto";





@Injectable()
export class MiddleWareService {
    constructor(private readonly cloudinary: CloudinaryService,
        @InjectModel('User') private readonly userModel: Model<UserDto>,
        @InjectModel('Subscription') private readonly subscriptionModel: Model<SubscriptionDto>) { }





    // async fileValidationAndUploader(file: Express.Multer.File, folder: string) {
    //     const supportedFormat = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4']
    //     try {
    //         // check file format
    //         const checkFormat = supportedFormat.find(format => format === file.mimetype)
    //         if (!checkFormat)
    //             return {
    //                 message: `file format not supported, supported formart(${supportedFormat})`,
    //                 type: "format"
    //             }


    //         // check file size
    //         if (file.size > 10000000) //10mb
    //             return {
    //                 message: `file size too large than 10mb`,
    //                 type: "size"
    //             }


    //         // upload file to cloudinary
    //         const upload = await this.cloudinary.uploadImage(file, folder)

    //         return {
    //             type: "upload",
    //             data: upload
    //         }
    //     } catch (error) {
    //         throw new HttpException({
    //             status: HttpStatus.BAD_REQUEST,
    //             error: error.message,
    //         }, HttpStatus.BAD_REQUEST);
    //     }
    // }




    async checkUserExists(userid: Types.ObjectId) {
        try {
            const user = await this.userModel.findById(userid).select(`-password -createdAt -updatedAt 
            -ip -device_verified`)
            if (!user) return;

            return user;

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }





    async checkSubscription({ userid, userNameId }) {
        try {
            //check subscription status of logged in user 
            const isSubscribed = await this.subscriptionModel.findOne({ subscriber: userid, user: userNameId })
            if (!isSubscribed) return false


            //check if subscription still active

            return true

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }



}