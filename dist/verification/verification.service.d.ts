import { Model } from "mongoose";
import { VerificationCodeDto } from "src/signup/dto/verificationcode.dto";
import { Types } from "mongoose";
export declare class VerficationService {
    private readonly verificationCodeModel;
    constructor(verificationCodeModel: Model<VerificationCodeDto>);
    private generateCode;
    sendVerificationCode({ email, id }: {
        email: string;
        id: Types.ObjectId;
    }): Promise<void>;
}
