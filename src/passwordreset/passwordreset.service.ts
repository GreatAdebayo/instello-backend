import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/signup/dto/user.dto';
import { VerifyDto } from 'src/signup/dto/verify.dto';
import { VerficationService } from 'src/verificationcode/verificationcode.service';
import { ResetDto } from './dto/reset.dto';
import { ResponseDto } from './dto/response.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';


@Injectable()
export class PasswordresetService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDto>,
        @InjectModel('VerificationCode') private readonly verificationCodeModel: Model<VerifyDto>,
        private readonly verificationService: VerficationService,
        private mailerService: MailerService) { }


    private async checkEmail(emai: string) {
        try {
            const user = await this.userModel.findOne({ email: emai });
            if (!user) return false

            return user._id
        } catch (error) {
            throw new ForbiddenException('something is wrong!')
        }
    }



    async sendCode(email: string) {
        let response: ResponseDto;
        let userid = await this.checkEmail(email)
        if (!userid) return response = {
            message: "user not found",
            status: 400,
            isSuccess: true
        }
        await this.verificationService.sendVerificationCode({ email, id: userid })
        return response = {
            message: "a 4-digit code was sent to your email, please verify your email",
            data: email,
            status: 200,
            isSuccess: true
        }
    }



    async updatePassword({ code, password }: ResetDto, email: string) {
        let response: ResponseDto;
        try {
            let userid = await this.checkEmail(email)
            if (!userid) return response = {
                message: "user not found",
                status: 400,
                isSuccess: false
            }

            // fetch code from db and checking if valid 
            const checkCode = await this.verificationCodeModel.findOne({
                user: userid,
                code
            });

            if (!checkCode)
                return response = {
                    message: "incorrect code",
                    status: 400,
                    isSuccess: false
                }


            // exp time to millisecond 
            const exp_date = new Date(checkCode.exp)

            // present time to millisecond 
            const present_date = new Date()
            // check if code has not expired 
            if (exp_date.getTime() > present_date.getTime()) {
                //encrypt password
                const salt = 10;
                const hashedPassword = await bcrypt.hash(password, salt);
                // update passqord 
                await this.userModel.updateOne(
                    { _id: userid },
                    {
                        $set: { password: hashedPassword },
                    }
                );

                //send email on password changed
                await this.mailerService.passwordReset(email)
                return response = {
                    message: "password succefully changed",
                    status: 200,
                    isSuccess: false
                }
            }
            else {
                return response = {
                    message: "code expired",
                    status: 400,
                    isSuccess: false
                }
            }

        } catch (error) {
            throw new ForbiddenException('something is wrong!')
        }

    }
}
