import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from '@nestjs/passport';
import { VerifyDto } from "./dto/verify.dto";

@Controller('api')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(AuthGuard('local'))
    @Post('signin')
    async signIn(@Request() req: any) {
        // user IP address 
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const response = await this.authService.signIn(req.user, ip);
        return response;
    }

    @Post('signinverify')
    async verifySignIn(@Body() body: VerifyDto, @Request() req: any) {
        // user IP address 
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        const response = await this.authService.verifySignIn(body, ip);
        return response;
    }
}