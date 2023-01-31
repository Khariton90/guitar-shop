import { CommentsModel, CommentsSchema } from './comments.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CommentsModel.name, schema: CommentsSchema }
    ])
  ],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentsModule {}
