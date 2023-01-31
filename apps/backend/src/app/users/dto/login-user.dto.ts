import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    description: 'Unique user email',
    required: true,
    example: '1@mail.ru'
  })
  @IsEmail({unique: true }, { message: 'The mail must be unique' })
  public email: string;

  @ApiProperty({
    description: 'The password',
    required: true,
    example: '123456'
  })
  @MinLength(6, { message: 'Min length password should be 6' })
  @MaxLength(12, { message: 'Max length password should be 12' })
  public password: string;
}