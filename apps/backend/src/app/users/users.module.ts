import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UserModel, UserSchema } from './users.model';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema}
    ]),
    ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
