import { CacheModule, Module } from '@nestjs/common';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { PostSchema } from 'src/schema/post.schema';
import { CommentSchema } from 'src/schema/comment.schema';
import { LikeSchema } from 'src/schema/like.schema';
import * as redisStore from "cache-manager-redis-store"
import { SubscriptionSchema } from 'src/schema/subscription.schema';
import { MiddleWareModule } from '../middlewares/middleware.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { PostMediaSchema } from 'src/schema/media.schema';




@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Post', schema: PostSchema },
    { name: 'Comment', schema: CommentSchema },
    { name: 'Like', schema: LikeSchema },
    { name: 'Subscription', schema: SubscriptionSchema },
    { name: 'PostMedia', schema: PostMediaSchema },
  ]), CacheModule.register({
    ttl: 30, store: redisStore, socket: {
      host: 'localhost',
      port: 6379
    }
  }), MiddleWareModule, CloudinaryModule],
  controllers: [PostController],
  providers: [PostService, JwtStrategy]
})



export class PostModule {

}
