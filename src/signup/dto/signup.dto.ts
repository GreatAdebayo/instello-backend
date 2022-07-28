import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"


export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    lastName: string

    @IsNotEmpty()
    @IsEmail()
    email: string


    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password too weak' })
    password: string

    userName: string
    ip: string[]
    email_verified: boolean
    device_verified: boolean
    noOfFollowers: number
    noOfFollowing: number
    noOfPosts: number
}