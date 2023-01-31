import { UsersEntity } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async registration({username, email, password, userRole}: CreateUserDto) {

    const user = {
      username,
      email,
      passwordHash: password,
      userRole
    }
    const userEntity = await new UsersEntity(user).setPassword(password);
    return await this.usersRepository.create(userEntity);
  }

  async findById(id: string) {
    return await this.usersRepository.findById(id);
  }

  async findByEmail(email: string) {
    return await this.usersRepository.findByEmail(email);
  }

  async delete(id: string) {
    await this.usersRepository.destroy(id);
  }
}
