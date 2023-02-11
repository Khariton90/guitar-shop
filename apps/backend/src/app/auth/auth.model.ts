import { AuthUser } from '@guitar-shop/shared-types';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  collection: 'authentication',
  timestamps: true,
  versionKey: false
})
export class AuthModel implements AuthUser {
  @Prop({
    required: true
  })
  userId: string;  
  
  @Prop({
    required: true
  })
  public refreshToken: string;
}

export const AuthModelSchema = SchemaFactory.createForClass(AuthModel);