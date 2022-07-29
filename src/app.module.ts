import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './signup/signup.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PasswordresetModule } from './passwordreset/passwordreset.module';

@Module({
  imports: [SignupModule, MongooseModule.forRoot('mongodb+srv://great:8AYkra15GXQJjimm@shop.wej5v.mongodb.net/instello?retryWrites=true&w=majority'),
    ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, PasswordresetModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
