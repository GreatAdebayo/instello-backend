import { IsEmail, IsNotEmpty, IsNumber } from "class-validator"

export class VerifyDto {
    @IsNotEmpty()
    @IsNumber()
    code: number

    @IsNotEmpty()
    @IsEmail()
    email: string

    exp: Date
}