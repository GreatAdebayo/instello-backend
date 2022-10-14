import { Controller, Get, UseGuards, Request, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseDto } from './../response.dto';
import { FeedService } from './feed.service';



@Controller('api/feeds')
export class FeedController {
    constructor(private readonly feedService: FeedService) { }


    @Get()
    async privateFeeds(@Res() res) {
        const response: ResponseDto = await this.feedService.feeds()
        // return res.status(response.status).json(response)
    }

}
