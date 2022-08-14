import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from 'src/schema/comment.schema';
import { MiddleWareModule } from '../middlewares/middleware.module';
import { PostSchema } from 'src/schema/post.schema';



@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Comment', schema: CommentSchema },
    { name: 'Post', schema: PostSchema },
  ]), MiddleWareModule],
  providers: [CommentService, JwtStrategy],
  controllers: [CommentController]
})
export class CommentModule { }
