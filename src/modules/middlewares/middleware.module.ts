import { Module } from "@nestjs/common";
import { MiddleWareService } from "./middleware.service";
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from "src/schema/user.schema";


@Module({
    imports: [CloudinaryModule, MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
    ])],
    providers: [MiddleWareService],
    controllers: [],
    exports: [MiddleWareService]
})

export class MiddleWareModule { }