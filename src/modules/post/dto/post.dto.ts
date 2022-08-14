import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { Types } from "mongoose"


export class PostDto {
    user: Types.ObjectId

    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    @MinLength(10)
    caption: string

    type: string

    media: []
    comment: []
    like: []
}


export class PostQuery {
    @IsNotEmpty()
    type: string
}