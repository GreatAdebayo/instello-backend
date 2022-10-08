import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { Types } from "mongoose"



export interface NewAssetDtoObj {
    base64: string
    mediaType: string
}
export class PostDto {
    user: Types.ObjectId

    @IsNotEmpty()
    @IsString()
    @MaxLength(1000)
    @MinLength(10)
    caption: string

    @IsNotEmpty()
    @IsString()
    type: string

    assets: NewAssetDtoObj[]

    // mediaType: string

    comments: []
    likes: []
    medias: string[]

}


export class GetPostDto {
    limit: number
    type: string
}





