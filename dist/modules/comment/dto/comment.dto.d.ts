import { Types } from "mongoose";
export declare class CommentDto {
    post: Types.ObjectId;
    user: Types.ObjectId;
    content: string;
}
