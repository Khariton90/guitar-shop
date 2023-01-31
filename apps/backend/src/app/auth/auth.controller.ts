import { LoginUserDto } from './../users/dto/login-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  async verify(@Body() dto: LoginUserDto) {
    const { _id, email, passwordHash, userRole, username } = await this.authService.authorization(dto);
    return await this.authService.login({id: _id, email, passwordHash, userRole, username})
  }
}
