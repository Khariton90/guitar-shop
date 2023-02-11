import { CreateTokenDto } from './dto/create-token.dto';
import { AuthModel } from './auth.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectModel(AuthModel.name) private readonly authModel: Model<AuthModel>
  ) {}

  async find(refreshToken: string) {
    const token = await this.authModel.findOne({refreshToken});
    return token;
  }

  async create(dto: CreateTokenDto) {
    const { userId } = dto;
    const existToken = await this.authModel.findOne({userId});

    if (!existToken) {
      const newToken = new this.authModel(dto);
      return newToken.save();
    }

    return existToken;
  }

  async destroy(id: string) {
    await this.authModel.findByIdAndDelete(id);
  }
}