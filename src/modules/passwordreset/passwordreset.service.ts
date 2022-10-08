import { ForbiddenException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
import { VerifyDto } from 'src/modules/signup/dto/verify.dto';
import { VerficationService } from 'src/modules/verificationcode/verificationcode.service';
import { ResetDto } from './dto/reset.dto';
import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/modules/mailer/mailer.service';


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
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }



    async sendCode(email: string) {
        try {
            let userid = await this.checkEmail(email)
            if (!userid) return {
                message: "user not found",
                status: 400,
                isSuccess: true
            }
            await this.verificationService.sendVerificationCode({ email, id: userid })
            return {
                message: "a 4-digit code was sent to your email, please verify your email",
                data: email,
                status: 200,
                isSuccess: true
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }
    }



    async updatePassword({ code, password }: ResetDto, email: string) {
        try {
            let userid = await this.checkEmail(email)
            if (!userid) return {
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
                return {
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
                // await this.mailerService.passwordReset(email)
                return {
                    message: "password succefully changed",
                    status: 200,
                    isSuccess: false
                }
            }
            else {
                return {
                    message: "code expired",
                    status: 400,
                    isSuccess: false
                }
            }

        } catch (error) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: error.message,
            }, HttpStatus.BAD_REQUEST);
        }

    }
}
