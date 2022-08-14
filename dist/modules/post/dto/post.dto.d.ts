import { Types } from "mongoose";
export declare class PostDto {
    user: Types.ObjectId;
    caption: string;
    type: string;
    media: [];
    comment: [];
    like: [];
}
export declare class PostQuery {
    type: string;
}
