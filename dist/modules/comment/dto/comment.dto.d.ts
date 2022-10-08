import { Types } from "mongoose";
export declare class CommentDto {
    post: Types.ObjectId;
    username: string;
    content: string;
}
