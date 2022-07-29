import { Types } from "mongoose"

interface Media {
    url: string
    cloudinary_id: string
}


// interface Comment {
//     url: string
//     cloudinary_id: string
// }

export class PostDto {
    user: Types.ObjectId
    caption: number
    access: string
    media: Media[]
}