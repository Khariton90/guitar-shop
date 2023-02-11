import { AuthRepository } from './auth.repository';
import { AuthModel, AuthModelSchema } from './auth.model';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './../strategies/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getJwtConfig } from '../config/jwt.config';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getJwtConfig
  }),
  MongooseModule.forFeature([
    { name: AuthModel.name, schema: AuthModelSchema }
  ])
],
  providers: [AuthService, JwtStrategy, AuthRepository],
  controllers: [AuthController],
})
export class AuthModule {}
