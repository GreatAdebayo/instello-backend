import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { MailerModule } from "src/modules/mailer/mailer.module";
import { VerificationCodeSchema } from "src/schema/verificationcode.schema";
import { VerficationService } from "./verificationcode.service";


@Module({
    imports: [MongooseModule.forFeature([
        { name: 'VerificationCode', schema: VerificationCodeSchema }
    ]), MailerModule],
    controllers: [],
    providers: [VerficationService],
    exports: [VerficationService]
})
export class VerificationModule { }