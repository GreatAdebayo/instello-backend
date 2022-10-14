import { Module } from '@nestjs/common';
import { MiddleWareModule } from '../middlewares/middleware.module';
import { FeedService } from './feed.service';
import { PostSchema } from 'src/schema/post.schema';
import { CommentSchema } from 'src/schema/comment.schema';
import { LikeSchema } from 'src/schema/like.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { FollowSchema } from 'src/schema/follow.schema';
import { FeedController } from './feed.controller';
import { PostMediaSchema } from 'src/schema/media.schema';
import { UserSchema } from 'src/schema/user.schema';




@Module({
  providers: [FeedService],
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Post', schema: PostSchema },
    { name: 'Comment', schema: CommentSchema },
    { name: 'Like', schema: LikeSchema },
    { name: 'Follow', schema: FollowSchema },
    { name: 'PostMedia', schema: PostMediaSchema },
  ]), MiddleWareModule],
  controllers: [FeedController]
})
export class FeedModule { }
