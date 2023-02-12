import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { ResponseUserDto } from './rdo/response-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Post, Delete, Param, Get, UseGuards } from '@nestjs/common';
import { fillObject } from '@guitar-shop/core';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() dto: CreateUserDto) {
    const user = await this.usersService.registration(dto);
    return fillObject(ResponseUserDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async findById(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    return fillObject(ResponseUserDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);
  }
}
