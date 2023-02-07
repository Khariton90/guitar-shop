import { ResponseUserDto } from './../users/rdo/response-user.dto';
import { LoginUserDto } from './../users/dto/login-user.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UsersEntity } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    ) {}

  async authorization(user: LoginUserDto) {
    const existUser = await this.usersService.findByEmail(user.email);

    if (!existUser) {
      throw new UnauthorizedException();
    }
    
    const validPassword = await new UsersEntity(existUser).comparePassword(user.password);

    if (!validPassword) {
      throw new UnauthorizedException();
    }

    return existUser;
  }

  async login(user: ResponseUserDto) {
    const payload = {
      sub: user.id,
      email: user.email
    }

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {expiresIn: '7d'})

    return {
      ...user,
      token: accessToken,
    }
  }
}
