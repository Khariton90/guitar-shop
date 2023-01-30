import { Document } from 'mongoose';
// import { User } from '@readme/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export interface User {
  _id?: string;
  email: string;
  firstname: string;
  lastname: string;
  passwordHash: string;
  avatar: string;
  dateRegister: Date;
  subscribers: number;
  posts: number;
}


@Schema({
  collection: 'users'
})
export class UserModel extends Document implements User {
  @Prop({
    required: true,
    unique: true
  })
  public email: string;

  @Prop({
    required: true
  })
  public firstname: string;

  @Prop({
    required: true
  })
  public lastname: string;

  @Prop({
    required: true
  })
  public passwordHash: string;

  @Prop()
  public avatar: string;

  @Prop({
    required: true
  })
  public dateRegister: Date;

  @Prop({
    required: true
  })
  public subscribers: number;

  @Prop({
    required: true
  })
  public posts: number;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);