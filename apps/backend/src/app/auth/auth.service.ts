import { AuthRepository } from './auth.repository';
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
    private readonly authRepository: AuthRepository
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
      sub: user.id.toString(),
      email: user.email
    }

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      { expiresIn: '7d' }
    )

    await this.authRepository.create({ 
      userId: user.id, 
      refreshToken 
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  async refreshToken(refreshStr: string) {
    const userSub = await this.retrieveRefreshToken(refreshStr);
    if (!userSub) {
      return undefined;
    }

    const user = await this.usersService.findById(userSub);

    if (!user) {
      return undefined
    }

    const payload = {
      sub: user._id,
      email: user.email,
    }

    const accessToken = await this.jwtService.signAsync(payload);
    const existUser = {
      id: user._id, 
      email: user.email, 
      userRole: user.userRole, 
      username: user.username, 
      token: accessToken 
    };
    return existUser;
  }

  async retrieveRefreshToken(refreshToken: string): Promise<string | undefined> {
    try {
      const { sub } = await this.jwtService.verifyAsync(refreshToken);
      return sub;
    } catch (e) {
      return undefined;
    }
  }

  async logout(refreshToken: string): Promise<void> {
    await this.authRepository.destroy(refreshToken);
  }
}
