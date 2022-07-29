import { IsString, MinLength, IsNotEmpty, Matches, IsNumber } from "class-validator"

export class ResetDto {
    @IsNotEmpty()
    @IsNumber()
    code: number

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string
}