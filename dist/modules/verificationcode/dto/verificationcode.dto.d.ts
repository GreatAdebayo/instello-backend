import { Types } from "mongoose";
export declare class VerificationCodeDto {
    user: Types.ObjectId;
    code: number;
    exp: string;
}
