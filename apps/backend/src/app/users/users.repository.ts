import { Injectable } from '@nestjs/common';
import { User } from '@guitar-shop/shared-types';
import { UsersEntity } from './users.entity';
import { CRUDRepository } from '@guitar-shop/core';
import { InjectModel } from '@nestjs/mongoose';
import { UserModel } from './users.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository implements CRUDRepository<UsersEntity, string, User> {
  constructor(
    @InjectModel(UserModel.name) private readonly usersModel: Model<UserModel>,
  ) {}

  public async findById(id: string): Promise<User> {
    return await this.usersModel.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<User> {
    return await this.usersModel.findOne({email}).exec();
  }
  
  public async create(item: UsersEntity): Promise<User> {
    const newUser = new this.usersModel(item);

    return newUser.save();
  }
  
  public async update(id: string, item: UsersEntity): Promise<User> {
    return await this.usersModel
    .findByIdAndUpdate(id, item.toObject(), {new: true})
    .exec();
  }
  
  public async destroy(id: string): Promise<void> {
    await this.usersModel.findOneAndDelete({id});
  }
}