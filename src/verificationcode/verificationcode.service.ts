import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { VerificationCodeDto } from "src/verificationcode/dto/verificationcode.dto";
const date = require("date-and-time");
import { Types } from "mongoose"
import { MailerService } from "src/mailer/mailer.service";

@Injectable()
export class VerficationService {
    constructor(@InjectModel('VerificationCode') private readonly verificationCodeModel: Model<VerificationCodeDto>,
        private mailerService: MailerService) { }

    // generate verification code and save in db 
    private async generateCode({ email, id }: { email: string, id: Types.ObjectId }) {
        // 4 digit code 
        const rand = Math.floor(1000 + Math.random() * 9000);
        const now = new Date();
        // Expiring time 10 minutes
        const ten_minutes_later: Date = date.addMinutes(
            now,
            10
        );

        try {
            const code = new this.verificationCodeModel({
                user: id,
                email,
                code: rand,
                exp: ten_minutes_later
            });

            await code.save();
            return rand;
        } catch (error) {
            throw new ForbiddenException('something is wrong!')
        }
    }

    // send verification code to email
    async sendVerificationCode({ email, id }: { email: string, id: Types.ObjectId }) {
        const code = await this.generateCode({ email, id });
        //send code to email
        await this.mailerService.sendVerificationCode({ email, code })
        return;
    }
}