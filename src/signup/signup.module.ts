import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/schema/user.schema";
import { VerificationCodeSchema } from "src/schema/verificationcode.schema";
import { VerificationModule } from "src/verificationcode/verificationcode.module";
import { SignupController } from "./signup.controller";
import { SignupService } from "./signup.service";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "../jwt/jwt.constant";
import { MailerModule } from "src/mailer/mailer.module";
import { ThrottlerModule } from '@nestjs/throttler';


@Module({
    imports: [MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
        { name: 'VerificationCode', schema: VerificationCodeSchema }
    ]), VerificationModule, JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60000s' },
    }), MailerModule, ThrottlerModule.forRoot({
        ttl: 60,
        limit: 5,
    })],
    controllers: [SignupController],
    providers: [SignupService]

})
export class SignupModule { }