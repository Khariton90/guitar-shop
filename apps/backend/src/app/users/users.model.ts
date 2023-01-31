import { Document } from 'mongoose';
import { User } from '@guitar-shop/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserRole } from '@guitar-shop/shared-types';

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
    type: String, 
    enum: UserRole, 
    default: UserRole.User 
  })
  public userRole: UserRole;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);