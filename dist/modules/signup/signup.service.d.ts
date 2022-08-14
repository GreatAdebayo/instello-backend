import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { VerficationService } from "src/modules/verificationcode/verificationcode.service";
import { VerifyDto } from "./dto/verify.dto";
import { JwtService } from '@nestjs/jwt';
import { MailerService } from "src/modules/mailer/mailer.service";
export declare class SignupService {
    private readonly userModel;
    private readonly verificationCodeModel;
    private readonly verificationService;
    private readonly jwtService;
    private readonly mailerService;
    constructor(userModel: Model<UserDto>, verificationCodeModel: Model<VerifyDto>, verificationService: VerficationService, jwtService: JwtService, mailerService: MailerService);
    defaultSignup({ userName, firstName, lastName, email, password }: UserDto, ip: string): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
        data?: undefined;
    } | {
        message: string;
        data: string;
        status: number;
        isSuccess: boolean;
    }>;
    verify({ email, code }: VerifyDto): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
        data?: undefined;
    } | {
        message: string;
        status: number;
        isSuccess: boolean;
        data: string;
    }>;
    resendCode({ email }: {
        email: any;
    }): Promise<{
        message: string;
        status: number;
        isSuccess: boolean;
        data?: undefined;
    } | {
        message: string;
        data: any;
        status: number;
        isSuccess: boolean;
    }>;
}
