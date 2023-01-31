import { Document } from 'mongoose';
import { User } from '@guitar-shop/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'users'
})
export class UserModel extends Document implements User {
  @Prop({
    required: true
  })
  public username: string;

  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop({
    required: true
  })
  public userRole: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);