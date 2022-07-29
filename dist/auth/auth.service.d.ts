/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from "mongoose";
import { UserDto } from "src/signup/dto/user.dto";
import { JwtService } from "@nestjs/jwt";
import { VerficationService } from "src/verificationcode/verificationcode.service";
import { VerifyDto } from "./dto/verify.dto";
import { MailerService } from "src/mailer/mailer.service";
export declare class AuthService {
    private readonly userModel;
    private readonly verificationCodeModel;
    private readonly jwtService;
    private verificationService;
    private mailerService;
    constructor(userModel: Model<UserDto>, verificationCodeModel: Model<VerifyDto>, jwtService: JwtService, verificationService: VerficationService, mailerService: MailerService);
    validateUser(email: string, password: string): Promise<import("mongoose").Document<unknown, any, UserDto> & UserDto & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    signIn(user: any, ip: string): Promise<{
        message: string;
        status: number;
        isSuccess: true;
        data: string;
    } | {
        message: string;
        data: any;
        status: number;
        isSuccess: false;
    }>;
    verifySignIn({ email, code }: VerifyDto, ip: string): Promise<{
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
}
