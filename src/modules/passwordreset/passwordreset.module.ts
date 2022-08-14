import { Module } from '@nestjs/common';
import { PasswordresetService } from './passwordreset.service';
import { PasswordresetController } from './passwordreset.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from 'src/schema/user.schema';
import { VerificationCodeSchema } from 'src/schema/verificationcode.schema';
import { VerificationModule } from 'src/modules/verificationcode/verificationcode.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from 'src/modules/mailer/mailer.module';


@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'VerificationCode', schema: VerificationCodeSchema }
  ]), VerificationModule, ThrottlerModule.forRoot(), MailerModule],
  providers: [PasswordresetService],
  controllers: [PasswordresetController]
})
export class PasswordresetModule { }
