import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import { VerficationService } from "src/modules/verificationcode/verificationcode.service";
import { VerifyDto } from "./dto/verify.dto";
import { JwtService } from '@nestjs/jwt';
import { MailerService } from "src/modules/mailer/mailer.service";






@Injectable({})
export class SignupService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDto>,
        @InjectModel('VerificationCode') private readonly verificationCodeModel: Model<VerifyDto>,
        private readonly verificationService: VerficationService,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService) { }




    async defaultSignup({ userName, firstName, lastName, email, password }: UserDto, ip: string) {
        //check if email and username  already exists
        const [user, username] = await Promise.all([this.userModel.findOne({ email }), this.userModel.findOne({ userName })])

        if (user)
            return {
                message: "email already in use",
                status: 400,
                isSuccess: false
            }

        //check if username already exists
        if (username) return {
            message: "username taken",
            status: 400,
            isSuccess: false
        }

        //encrypt password
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        //insert details into db
        try {
            const user = new this.userModel({
                userName,
                firstName,
                lastName,
                email,
                password: hashedPassword
            });
            user.ip.push(ip)
            await user.save();


            //send verification code
            await this.verificationService.sendVerificationCode({ email: user.email, id: user._id })
            return {
                message: "a 4-digit code was sent to your email, please verify your email",
                data: user.email,
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





    async verify({ email, code }: VerifyDto) {
        try {
            //check if email exists
            const user = await this.userModel.findOne({ email })
            if (!user) return {
                message: "email not found",
                status: 400,
                isSuccess: false
            }

            //check if email already verified
            if (user.email_verified) return {
                message: "email already verified",
                status: 400,
                isSuccess: false
            }


            // fetch code from db and checking if valid 
            const checkCode = await this.verificationCodeModel.findOne({
                user: user._id,
                code
            });


            if (!checkCode) return {
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
                // update email verification status 
                await this.userModel.updateOne(
                    { _id: user._id },
                    {
                        $set: { email_verified: true },
                    }
                );

                //generate JWT 
                const payload = { sub: user._id };

                //send welcome message
                await this.mailerService.welcomeMessage({ email: user.email, lastName: user.lastName })

                return {
                    message: "verified succesfully",
                    status: 200,
                    isSuccess: true,
                    data: this.jwtService.sign(payload)
                }
            } else {
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






    async resendCode({ email }) {
        try {
            //check if email exists
            const user = await this.userModel.findOne({ email })
            if (!user) return {
                message: "email not found",
                status: 400,
                isSuccess: false,
            }

            //send verification code
            await this.verificationService.sendVerificationCode({ email: user.email, id: user._id })
            return {
                message: "a 4-digit code has been sent to your email, please verify your email",
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
}






