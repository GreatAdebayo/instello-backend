import { Body, Controller, UseGuards, Post, Req, Res } from "@nestjs/common";
import { SendCodeDto } from "./dto/sendcode.dto";
import { UserDto } from "./dto/user.dto";
import { VerifyDto } from "./dto/verify.dto";
import { SignupService } from "./signup.service";
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('api/signup')
export class SignupController {
    constructor(private readonly signupService: SignupService) { }


    @Post('default')
    async defaultSignup(@Body() body: UserDto, @Res() res, @Req() req) {
        // user IP address 
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const response = await this.signupService.defaultSignup(body, ip)
        return res.status(response.status).json(response)
    }



    @Post('verify')
    async verify(@Body() body: VerifyDto, @Res() res) {
        const response = await this.signupService.verify(body)
        return res.status(response.status).json(response)
    }



    @UseGuards(ThrottlerGuard)
    @Throttle(1, 60)
    @Post('resendcode')
    async resendCode(@Body() body: SendCodeDto, @Res() res) {
        const response = await this.signupService.resendCode(body)
        return res.status(response.status).json(response)
    }
}

