import { Controller, Get, Param, Query, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';


@Controller('api/userinfo')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @UseGuards(AuthGuard('jwt'))
    @Get('private')
    async privateUserInfo(@Request() req, @Res() res) {
        const response = await this.userService.privateUserInfo(req.user.id)
        return res.status(response.status).json(response)
    }

    @Get('public/:username')
    async publiceUserInfo(@Param("username") username: string, @Res() res) {
        const response = await this.userService.publicUserInfo(username)
        return res.status(response.status).json(response)
    }



    @UseGuards(ThrottlerGuard)
    @Throttle(1, 1)
    @Get('search')
    async searchUser(@Res() res, @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
        @Query('username') username: string) {
        const response = await this.userService.searchUser({ page, limit, username })
        return res.status(response.status).json(response)
    }
}
