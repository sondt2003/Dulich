import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { PlaceService } from '../place/place.service';

@Module({
  controllers: [CommentController],
  exports: [CommentService],
  providers: [CommentService, PlaceService],
})
export class CommentModule {}
