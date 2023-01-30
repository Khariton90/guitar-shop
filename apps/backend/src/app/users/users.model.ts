import { Document } from 'mongoose';
// import { User } from '@readme/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface User {
  _id?: string;
  username: string;
  email: string;
  passwordHash: string;
  userRole: string;
}

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