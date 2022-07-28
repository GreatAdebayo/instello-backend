import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { SignUpDto } from "src/signup/default/dto/signup.dto";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import { ResponseDto } from "./dto/response.dto";
import { VerficationService } from "src/verificationcode/verificationcode.service";
import { VerifyDto } from "./dto/verify.dto";
import { MailerService } from "src/mailer/mailer.service";


@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly userModel: Model<SignUpDto>,
        @InjectModel('VerificationCode') private readonly verificationCodeModel: Model<VerifyDto>,
        private readonly jwtService: JwtService,
        private verificationService: VerficationService,
        private mailerService: MailerService) { }


    async validateUser(email: string, password: string) {
        const user = await this.userModel.findOne({ email });
        const isMatch = await bcrypt.compare(password, user.password);
        if (user && isMatch) {
            return user;
        }

        return null;
    }

    async signIn(user: any, ip: string) {
        let response: ResponseDto;
        //check user ip address if it matches
        const checkIp = user.ip.find((item) => item == ip)
        if (checkIp) {
            const payload = { sub: user.id };

            return response = {
                message: "signin successful",
                status: 200,
                isSuccess: true,
                data: this.jwtService.sign(payload)
            }
        } else {
            //user needs to verify device
            await this.userModel.updateOne(
                { _id: user._id },
                {
                    $set: { device_verified: false },
                }
            );
            //send verification code
            await this.verificationService.sendVerificationCode({ email: user.email, id: user._id })
            return response = {
                message: "a new device detected, a 4-digit code was sent to your email, please verify",
                data: user.email,
                status: 400,
                isSuccess: false
            }
        }
    }



    async verifySignIn({ email, code }: VerifyDto, ip: string) {
        let response: ResponseDto;
        try {
            //check if email exists
            const user = await this.userModel.findOne({ email })
            if (!user) return response = {
                message: "email not found",
                status: 400,
                isSuccess: false
            }

            //check if device already verified
            if (user.device_verified)
                return response = {
                    message: "device already verified",
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
                // update device verification status 
                const newIpArr = user.ip
                newIpArr.push(ip)
                await this.userModel.updateOne(
                    { _id: user._id },
                    {
                        $set: { device_verified: true, ip: newIpArr },
                    }
                );

                // generate JWT 
                const payload = { sub: user._id };

                //send new login message
                await this.mailerService.loginMessage({ email: user.email, lastName: user.lastName })

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
}
