import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StorySchema } from 'src/schema/story.schema';
import { StoryViewSchema } from 'src/schema/story_view.schema';
import { MiddleWareModule } from '../middlewares/middleware.module';
import { StoryController } from './story.controller';
import { StoryService } from './story.service';



@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Story', schema: StorySchema },
    { name: 'StoryView', schema: StoryViewSchema },
  ]), MiddleWareModule],
  controllers: [StoryController],
  providers: [StoryService]
})
export class StoryModule { }
