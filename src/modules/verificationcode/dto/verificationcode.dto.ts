import { Types } from "mongoose"

export class VerificationCodeDto {
    user: Types.ObjectId
    code: number
    exp: string
}