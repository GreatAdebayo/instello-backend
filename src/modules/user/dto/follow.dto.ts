import { Types } from "mongoose"

interface Follow {
    id: Types.ObjectId
    userName: string
    profilePicture: string
}

export class FollowDto {
    user: Follow
    follower: Follow
    following: Follow
}

