import { Body, Controller, Post, Request, UseGuards, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { VerifyDto } from "./dto/verify.dto";
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { ResponseDto } from "../response.dto";



@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) { }


    @UseGuards(AuthGuard('local'))
    @UseGuards(ThrottlerGuard)
    @Throttle(5, 30)
    @Post('signin')
    async signIn(@Request() req: any, @Res() res) {
        // user IP address 
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const response: ResponseDto = await this.authService.signIn(req.user, ip);
        return res.status(response.status).json(response)
    }



    @UseGuards(ThrottlerGuard)
    @Throttle(5, 30)
    @Post('signinverify')
    async verifySignIn(@Body() body: VerifyDto, @Request() req: any, @Res() res) {
        // user IP address 
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const response: ResponseDto = await this.authService.verifySignIn(body, ip);
        return res.status(response.status).json(response)
    }
}