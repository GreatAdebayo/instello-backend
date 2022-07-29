import { Model } from 'mongoose';
import { UserDto } from 'src/signup/dto/user.dto';
import { VerifyDto } from 'src/signup/dto/verify.dto';
import { VerficationService } from 'src/verificationcode/verificationcode.service';
import { ResetDto } from './dto/reset.dto';
import { MailerService } from 'src/mailer/mailer.service';
export declare class PasswordresetService {
    private readonly userModel;
    private readonly verificationCodeModel;
    private readonly verificationService;
    private mailerService;
    constructor(userModel: Model<UserDto>, verificationCodeModel: Model<VerifyDto>, verificationService: VerficationService, mailerService: MailerService);
    private checkEmail;
    sendCode(email: string): Promise<{
        message: string;
        status: number;
        isSuccess: true;
        data?: undefined;
    } | {
        message: string;
        data: string;
        status: number;
        isSuccess: true;
    }>;
    updatePassword({ code, password }: ResetDto, email: string): Promise<{
        message: string;
        status: number;
        isSuccess: false;
    }>;
}
