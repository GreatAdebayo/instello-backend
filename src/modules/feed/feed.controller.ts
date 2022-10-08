import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ResponseDto } from './../response.dto';
import { FeedService } from './feed.service';



@Controller('api/feeds')
export class FeedController {
    constructor(private readonly feedService: FeedService) { }



    @UseGuards(AuthGuard('jwt'))
    @Get('private')
    async privateFeeds(@Request() req) {
        await this.feedService.feeds(req.user.id);
    }

}
