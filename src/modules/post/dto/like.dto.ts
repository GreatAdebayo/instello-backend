import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { Types } from "mongoose"


export class LikeDto {
    username: string

    post: Types.ObjectId

}
