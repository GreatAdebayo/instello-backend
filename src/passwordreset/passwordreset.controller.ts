import { Controller, Get, Param, Post, Res, Body, UseGuards } from '@nestjs/common';
import { ResetDto } from './dto/reset.dto';
import { PasswordresetService } from './passwordreset.service';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';



@Controller('api/passwordreset')
export class PasswordresetController {
    constructor(private readonly passwordresetService: PasswordresetService,) { }


    @Get('/:email')
    async sendCode(@Param("email") email: string, @Res() res) {
        const response = await this.passwordresetService.sendCode(email)
        return res.status(response.status).json(response)
    }

    @UseGuards(ThrottlerGuard)
    @Throttle(1, 1200)
    @Post('/:email')
    async updatePassword(@Body() body: ResetDto, @Param("email") email: string, @Res() res) {
        const response = await this.passwordresetService.updatePassword(body, email)
        return res.status(response.status).json(response)
    }
}
