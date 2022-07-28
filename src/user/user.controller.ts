import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';



@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(AuthGuard('jwt'))
    @Get('info')
    async userInfo(@Request() req, @Res() res) {
        const response = await this.userService.userInfo(req.user.id)
        // return res.status(response.status).json(response)
    }
}
