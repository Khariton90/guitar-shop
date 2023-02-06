import { UserModel, UserSchema } from './../users/users.model';
import { CommentsRepository } from './comments.repository';
import { CommentsModel, CommentsSchema } from './comments.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      { name: CommentsModel.name, schema: CommentsSchema },
      { name: UserModel.name, schema: UserSchema }
    ])
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository, JwtStrategy],
})
export class CommentsModule {}
