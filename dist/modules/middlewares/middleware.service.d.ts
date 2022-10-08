/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { Model } from 'mongoose';
import { UserDto } from 'src/modules/signup/dto/user.dto';
import { Types } from 'mongoose';
import { SubscriptionDto } from "../post/dto/subscription.dto";
export declare class MiddleWareService {
    private readonly cloudinary;
    private readonly userModel;
    private readonly subscriptionModel;
    constructor(cloudinary: CloudinaryService, userModel: Model<UserDto>, subscriptionModel: Model<SubscriptionDto>);
    checkUserExists(userid: Types.ObjectId): Promise<import("mongoose").Document<unknown, any, UserDto> & UserDto & {
        _id: Types.ObjectId;
    }>;
    checkSubscription({ userid, userNameId }: {
        userid: any;
        userNameId: any;
    }): Promise<boolean>;
}
