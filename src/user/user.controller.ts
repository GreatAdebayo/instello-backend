import { Controller, Get, Request, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';



@Controller('api/userinfo')
export class UserController {
    constructor(private readonly userService: UserService) { }


    @UseGuards(AuthGuard('jwt'))
    @Get('private')
    async privateUserInfo(@Request() req, @Res() res) {
        const response = await this.userService.privateUserInfo(req.user.id)
        return res.status(response.status).json(response)
    }

    @Get('public')
    async publiceUserInfo(@Request() req, @Res() res) {
        // const response = await this.userService.userInfo(req.user.id)
        // return res.status(response.status).json(response)
    }
}
