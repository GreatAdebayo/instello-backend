import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { Types } from "mongoose"


export class CommentDto {
    post: Types.ObjectId


    username: string

    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    content: string

}


