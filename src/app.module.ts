import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SignupModule } from './modules/signup/signup.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PasswordresetModule } from './modules/passwordreset/passwordreset.module';
import { PostModule } from './modules/post/post.module';


@Module({
  imports: [SignupModule, MongooseModule.forRoot('mongodb+srv://great:8AYkra15GXQJjimm@shop.wej5v.mongodb.net/instello?retryWrites=true&w=majority'),
    ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, PasswordresetModule, PostModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
