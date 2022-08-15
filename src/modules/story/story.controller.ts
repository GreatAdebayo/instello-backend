import { StoryService } from './story.service';
import { Controller, Delete, Get, Post, UseGuards, Param, UseInterceptors, UploadedFile, Request, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ResponseDto } from './../response.dto';
import { Types } from 'mongoose'




@Controller('api/story')
export class StoryController {
    constructor(private readonly storyService: StoryService) { }



    @UseGuards(AuthGuard('jwt'))
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async postStory(@UploadedFile(
    ) file: Express.Multer.File, @Request() req, @Res() res) {
        const response: ResponseDto = await this.storyService.postStory(file, req.user.id)
        return res.status(response.status).json(response)
    }




    @UseGuards(AuthGuard('jwt'))
    @Get('private')
    async privateViewStory(@Request() req, @Res() res) {
        const response: ResponseDto = await this.storyService.privateViewStory(req.user.id)
        return res.status(response.status).json(response)
    }



    @UseGuards(AuthGuard('jwt'))
    @Get('public')
    async publicViewStory() {
        await this.storyService.publicViewStory()
    }





    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    async deleteStory(@Param("id") storyid: Types.ObjectId, @Request() req, @Res() res) {
        const response: ResponseDto = await this.storyService.deleteStory(storyid, req.user.id)
        return res.status(response.status).json(response)
    }


}
