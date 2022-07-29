import { Types } from "mongoose";
interface Media {
    url: string;
    cloudinary_id: string;
}
export declare class PostDto {
    user: Types.ObjectId;
    caption: number;
    access: string;
    media: Media[];
}
export {};
