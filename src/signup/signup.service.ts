import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ResponseDto } from "./dto/response.dto";
import { UserDto } from "./dto/user.dto";
import * as bcrypt from 'bcrypt';
import { VerficationService } from "src/verificationcode/verificationcode.service";
import { VerifyDto } from "./dto/verify.dto";
import { JwtService } from '@nestjs/jwt';
import { MailerService } from "src/mailer/mailer.service";



@Injectable({})
export class SignupService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDto>,
        @InjectModel('VerificationCode') private readonly verificationCodeModel: Model<VerifyDto>,
        private readonly verificationService: VerficationService,
        private readonly jwtService: JwtService,
        private readonly mailerService: MailerService) { }




    private async checkUser(email: string) {
        try {
            const user = await this.userModel.findOne({ email }).select("-password");
            if (user)
                return user

            return false
        } catch (error) {
            throw new ForbiddenException('something is wrong!')
        }
    }





    async defaultSignup({ firstName, lastName, email, password }: UserDto, ip: string) {
        let response: ResponseDto;
        //check if email already exists
        if (await this.checkUser(email)) {
            return response = {
                message: "email already in use",
                status: 400,
                isSuccess: false
            }
        } else {
            //encrypt password
            const salt = 10;
            const hashedPassword = await bcrypt.hash(password, salt);

            //insert details into db
            try {
                const user = new this.userModel({
                    userName: lastName,
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword
                });
                user.ip.push(ip)
                await user.save();


                //send verification code
                await this.verificationService.sendVerificationCode({ email: user.email, id: user._id })
                return response = {
                    message: "a 4-digit code was sent to your email, please verify your email",
                    data: user.email,
                    status: 200,
                    isSuccess: true
                }
            } catch (error) {
                throw new ForbiddenException('something is wrong!')
            }
        }

    }


    async verify({ email, code }: VerifyDto) {
        let response: ResponseDto;
        try {
            //check if email exists
            const user = await this.checkUser(email)
            if (!user) return response = {
                message: "email not found",
                status: 400,
                isSuccess: false
            }

            //check if email already verified
            if (user.email_verified) return response = {
                message: "email already verified",
                status: 400,
                isSuccess: false
            }


            // fetch code from db and checking if valid 
            const checkCode = await this.verificationCodeModel.findOne({
                user: user._id,
                code
            });

            if (!checkCode) return response = {
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

                // generate JWT 
                const payload = { sub: user._id };

                //send welcome message
                await this.mailerService.welcomeMessage({ email: user.email, lastName: user.lastName })

                return response = {
                    message: "verified succesfully",
                    status: 200,
                    isSuccess: true,
                    data: this.jwtService.sign(payload)
                }
            } else {
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



    async resendCode({ email }) {
        let response: ResponseDto;
        try {
            //check if email exists
            const user = await this.checkUser(email)
            if (!user) return response = {
                message: "email not found",
                status: 400,
                isSuccess: false,
            }

            //send verification code
            await this.verificationService.sendVerificationCode({ email: user.email, id: user._id })
            return response = {
                message: "a 4-digit code has been sent to your email, please verify your email",
                data: email,
                status: 200,
                isSuccess: true
            }
        } catch (error) {
            throw new ForbiddenException('something is wrong!')
        }
    }
}