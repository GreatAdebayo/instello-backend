import { Controller, Get, Param, Post, Query, Request, Res, UseGuards, Delete, Put, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ResponseDto } from '../response.dto';
import { EditProfile } from './dto/editprofile.dto';



@Controller('api/user')
export class UserController {
    constructor(private readonly userService: UserService) { }



    @UseGuards(AuthGuard('jwt'))
    @Get('private')
    async privateUserInfo(@Request() req, @Res() res) {
        const response: ResponseDto = await this.userService.privateUserInfo(req.user.id)
        return res.status(response.status).json(response)
    }


    @UseGuards(AuthGuard('jwt'))
    @Get('public/:username')
    async publiceUserInfo(@Param("username") username: string, @Res() res) {
        const response: ResponseDto = await this.userService.publicUserInfo(username)
        return res.status(response.status).json(response)
    }


    @UseGuards(AuthGuard('jwt'))
    // @UseGuards(ThrottlerGuard)
    // @Throttle(1, 1)
    @Get('search')
    async searchUser(@Res() res, @Query('page') page: number = 1,
        @Query('limit') limit: number = 5,
        @Query('username') username: string) {
        const response: ResponseDto = await this.userService.searchUser({ page, limit, username })
        return res.status(response.status).json(response)
    }




    @UseGuards(AuthGuard('jwt'))
    @Post('follow/:username')
    async followUser(@Param('username') username: string, @Request() req, @Res() res) {
        const response: ResponseDto = await this.userService.followUser(username, req.user.id)
        return res.status(response.status).json(response)
    }





    @UseGuards(AuthGuard('jwt'))
    @Delete('follow/:username')
    async unfollowUser(@Param() { username, id }, @Request() req, @Res() res) {
        const response: ResponseDto = await this.userService.unfollowUser(username, id, req.user.id);
        return res.status(response.status).json(response)
    }




    @UseGuards(AuthGuard('jwt'))
    @Post('editprofile')
    async editProfile(@Request() req, @Res() res) {
        const response: ResponseDto = await this.userService.editProfile(req)
        return res.status(response.status).json(response)
    }
}
