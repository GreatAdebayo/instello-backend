import { Module } from "@nestjs/common";
import { MiddleWareService } from "./middleware.service";
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from "src/schema/user.schema";
import { SubscriptionSchema } from "src/schema/subscription.schema";


@Module({
    imports: [CloudinaryModule, MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
        { name: 'Subscription', schema: SubscriptionSchema },
    ])],
    providers: [MiddleWareService],
    controllers: [],
    exports: [MiddleWareService]
})

export class MiddleWareModule { }