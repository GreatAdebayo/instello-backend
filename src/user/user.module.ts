import { CacheModule, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { FollowSchema } from 'src/schema/follow.schema';
import { PostSchema } from 'src/schema/post.schema';
import * as redisStore from "cache-manager-redis-store"


@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Follow', schema: FollowSchema },
    { name: 'Post', schema: PostSchema },
  ]), CacheModule.register({
    ttl: 900, store: redisStore, socket: {
      host: 'localhost',
      port: 6379
    }
  })],
  providers: [UserService, JwtStrategy],
  controllers: [UserController]
})
export class UserModule { }
