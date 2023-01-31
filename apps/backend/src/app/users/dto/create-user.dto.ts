import { UserRole } from '@guitar-shop/shared-types';
import { IsEmail, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({
    description: 'Required user name',
    required: true,
    example: 'Evgeniy'
  })
  username: string;

  @ApiProperty({
    description: 'Unique user email',
    required: true,
    example: '1@mail.ru'
  })
  @IsEmail({unique: true }, { message: 'The mail must be unique' })
  email: string;

  @ApiProperty({
    description: 'The password hash',
    required: true,
    example: '63d92851df1ce246385b2b48'
  })
  @MinLength(6, { message: 'Min length password hash should be 6' })
  @MaxLength(12, { message: 'Max length password hash should be 12' })
  password: string;
  userRole: UserRole;
}
