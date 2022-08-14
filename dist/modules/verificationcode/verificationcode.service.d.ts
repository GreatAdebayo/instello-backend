import { Model } from "mongoose";
import { VerificationCodeDto } from "src/modules/verificationcode/dto/verificationcode.dto";
import { Types } from "mongoose";
import { MailerService } from "src/modules/mailer/mailer.service";
export declare class VerficationService {
    private readonly verificationCodeModel;
    private mailerService;
    constructor(verificationCodeModel: Model<VerificationCodeDto>, mailerService: MailerService);
    private generateCode;
    sendVerificationCode({ email, id }: {
        email: string;
        id: Types.ObjectId;
    }): Promise<void>;
}
