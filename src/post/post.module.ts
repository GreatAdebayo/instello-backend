import { CacheModule, Module } from '@nestjs/common';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { PostSchema } from 'src/schema/post.schema';
import { CommentSchema } from 'src/schema/comment.schema';
import * as redisStore from "cache-manager-redis-store"


@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Post', schema: PostSchema },
    { name: 'Comment', schema: CommentSchema },
  ]), CacheModule.register({
    ttl: 30, store: redisStore, socket: {
      host: 'localhost',
      port: 6379
    }
  })],
  controllers: [PostController],
  providers: [PostService, JwtStrategy]
})
export class PostModule { }
