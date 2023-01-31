import { Comment } from '@guitar-shop/shared-types';
import { Document } from 'mongoose';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';

@Schema({
  collection: 'comments'
})
export class CommentsModel extends Document implements Comment {
  @Prop({
    required: true
  })
  author: string;

  @Prop({
    required: true
  })
  dignities: string;

  @Prop({
    required: true
  })
  disadvantage: string;

  @Prop({
    required: true,
    minlength: 5,
    maxlength: 1024
  })
  comment: string;

  @Prop({
    min: 1,
    max: 5,
    default: 1
  })
  rating: number;

  @Prop({
    required: true
  })
  date: Date;
}

export const CommentsSchema = SchemaFactory.createForClass(CommentsModel);

