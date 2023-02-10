import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { ExtendedUserRequest } from '@guitar-shop/shared-types';
import { LoginUserDto } from './../users/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  async verify(@Body() dto: LoginUserDto) {
    const { _id, email, userRole, username } = await this.authService.authorization(dto);
    return await this.authService.login({id: _id, email, userRole, username})
  }

  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  async refresh(@Body() dto: RefreshTokenDto, @Req() req: ExtendedUserRequest) {
    const user = await this.authService.refreshToken(dto.refreshStr);
    return user;
  }
}
