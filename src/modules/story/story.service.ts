import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MiddleWareService } from '../middlewares/middleware.service';
import { StoryDto, StoryViewDto } from './dto/story.dto';
import { Types } from 'mongoose'

@Injectable()
export class StoryService {
    constructor(@InjectModel('Story') private readonly storyModel: Model<StoryDto>,
        @InjectModel('StoryView') private readonly storyViewModel: Model<StoryViewDto>,
        private readonly middlewareService: MiddleWareService) { }




    async postStory(file: Express.Multer.File, userid: Types.ObjectId) {
        try {
            //check if user exists
            const user = await this.middlewareService.checkUserExists(userid)

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }

            const response = await this.middlewareService.fileValidationAndUploader(file, process.env.STORY)

            if (response.type == 'format')
                return {
                    message: response.message,
                    status: 400,
                    isSuccess: false
                }

            if (response.type == 'size')
                return {
                    message: response.message,
                    status: 400,
                    isSuccess: false
                }

            if (response.type == 'upload') {
                const { secure_url, public_id } = response.data


                // save  new story
                const story = new this.storyModel({
                    user: userid,
                    media: {
                        url: secure_url,
                        cloudinary_id: public_id,
                        format: file.mimetype
                    }
                })


                await story.save();

                return {
                    message: 'story successfully uploaded',
                    status: 200,
                    isSuccess: true
                }
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }






    async privateViewStory(userid: Types.ObjectId) {
        try {
            //check if user exists
            const user = await this.middlewareService.checkUserExists(userid)

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }

            const stories = await this.storyModel.find({ user: userid })

            if (stories.length == 0)
                return {
                    message: "no story found",
                    status: 400,
                    isSuccess: false
                }


            return {
                message: "stories fetched successfully",
                status: 200,
                isSuccess: true,
                data: stories
            }

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }




    

    async publicViewStory() { }






    async deleteStory(storyid: Types.ObjectId, userid: Types.ObjectId) {
        try {
            //check if user exists
            const user = await this.middlewareService.checkUserExists(userid)

            if (!user) return {
                message: "user not found",
                status: 400,
                isSuccess: false
            }


            //check if story exists and user owns it
            const post = await this.storyModel.findOne({ _id: storyid, user: userid })
            if (!post) return {
                message: "story not found",
                status: 400,
                isSuccess: false
            }


            // delete the story
            await this.storyModel.deleteOne({ _id: storyid })

            return {
                message: "story deleted",
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
