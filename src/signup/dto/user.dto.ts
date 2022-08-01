import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"
import { FollowDto } from "src/user/dto/follow.dto"


export class UserDto {
    @IsNotEmpty()
    @IsString()
    userName: string

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

    ip: string[]
    email_verified: boolean
    device_verified: boolean
    followers: FollowDto[]
    following: FollowDto[]
    noOfposts: number
}