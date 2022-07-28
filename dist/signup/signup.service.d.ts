import { Model } from "mongoose";
import { SignUpDto } from "./dto/signup.dto";
import { VerficationService } from "src/verificationcode/verificationcode.service";
import { VerifyDto } from "./dto/verify.dto";
import { JwtService } from '@nestjs/jwt';
import { MailerService } from "src/mailer/mailer.service";
export declare class SignupService {
    private readonly userModel;
    private readonly verificationCodeModel;
    private verificationService;
    private jwtService;
    private mailerService;
    constructor(userModel: Model<SignUpDto>, verificationCodeModel: Model<VerifyDto>, verificationService: VerficationService, jwtService: JwtService, mailerService: MailerService);
    private checkUser;
    defaultSignup({ firstName, lastName, email, password }: SignUpDto, ip: string): Promise<{
        message: string;
        status: number;
        isSuccess: false;
        data?: undefined;
    } | {
        message: string;
        data: string;
        status: number;
        isSuccess: true;
    }>;
    verify({ email, code }: VerifyDto): Promise<{
        message: string;
        status: number;
        isSuccess: false;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: true;
        data: string;
    }>;
    resendCode({ email }: {
        email: any;
    }): Promise<{
        message: string;
        status: number;
        isSuccess: false;
        data?: undefined;
    } | {
        message: string;
        data: any;
        status: number;
        isSuccess: true;
    }>;
}
