import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { FollowSchema } from 'src/schema/follow.schema';
import { PostSchema } from 'src/schema/post.schema';



@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Follow', schema: FollowSchema },
    { name: 'Post', schema: PostSchema },
  ])],
  providers: [UserService, JwtStrategy],
  controllers: [UserController]
})
export class UserModule { }
