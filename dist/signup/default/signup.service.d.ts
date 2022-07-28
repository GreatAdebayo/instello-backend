import { Model } from "mongoose";
import { UserDto } from "./dto/user.dto";
import { VerficationService } from "src/verificationcode/verificationcode.service";
import { VerifyDto } from "./dto/verify.dto";
import { JwtService } from '@nestjs/jwt';
export declare class SignupService {
    private readonly userModel;
    private readonly verificationCodeModel;
    private verificationService;
    private jwtService;
    constructor(userModel: Model<UserDto>, verificationCodeModel: Model<VerifyDto>, verificationService: VerficationService, jwtService: JwtService);
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
