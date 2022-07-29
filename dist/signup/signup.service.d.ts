import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { VerficationService } from "src/verificationcode/verificationcode.service";
import { VerifyDto } from "./dto/verify.dto";
import { JwtService } from '@nestjs/jwt';
import { MailerService } from "src/mailer/mailer.service";
export declare class SignupService {
    private readonly userModel;
    private readonly verificationCodeModel;
    private readonly verificationService;
    private readonly jwtService;
    private readonly mailerService;
    constructor(userModel: Model<UserDto>, verificationCodeModel: Model<VerifyDto>, verificationService: VerficationService, jwtService: JwtService, mailerService: MailerService);
    private checkUser;
    defaultSignup({ firstName, lastName, email, password }: UserDto, ip: string): Promise<{
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
