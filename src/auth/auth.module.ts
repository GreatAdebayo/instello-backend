import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "src/schema/user.schema";
import { LocalStrategy } from "./local.strategy";
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from "src/signup/jwt.constant";
import { VerificationModule } from "src/verificationcode/verificationcode.module";
import { VerificationCodeSchema } from "src/schema/verificationcode.schema";
import { MailerModule } from "src/mailer/mailer.module";



@Module({
    imports: [PassportModule, MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
        { name: 'VerificationCode', schema: VerificationCodeSchema }
    ]), JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '60s' },
    }), VerificationModule, MailerModule],
    providers: [AuthService, LocalStrategy],
    controllers: [AuthController]
})
export class AuthModule {

}