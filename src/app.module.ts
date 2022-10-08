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
import { CommentModule } from './modules/comment/comment.module';
import { FeedModule } from './modules/feed/feed.module';




@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://great:8AYkra15GXQJjimm@shop.wej5v.mongodb.net/instello?retryWrites=true&w=majority'),
  ConfigModule.forRoot({ isGlobal: true }),
    SignupModule,
    AuthModule,
    UserModule,
    PasswordresetModule,
    PostModule,
    CommentModule,
    FeedModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
