import { Types } from "mongoose";
export interface NewAssetDtoObj {
    base64: string;
    mediaType: string;
}
export declare class PostDto {
    user: Types.ObjectId;
    caption: string;
    mode: string;
    assets: NewAssetDtoObj[];
    comments: [];
    likes: [];
    medias: string[];
}
export declare class GetPostDto {
    limit: number;
    mode: string;
}
