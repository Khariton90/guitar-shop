import { LoginUserDto } from './../users/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  async verify(@Body() dto: LoginUserDto) {
    const { _id, email, userRole, username } = await this.authService.authorization(dto);
    return await this.authService.login({id: _id, email, userRole, username});
  }

  @Post('/refresh')
  async refreshToken(@Body() dto: RefreshTokenDto) {
    const { refreshToken } = dto;
    const { id, email, userRole, username } = await this.authService.refreshToken(refreshToken);
    return {id, email, userRole, username };
  }

  @Delete('/logout')
  async logout(@Body() dto: RefreshTokenDto) {
    const { refreshToken } = dto;
    await this.authService.logout(refreshToken);
  }
}
