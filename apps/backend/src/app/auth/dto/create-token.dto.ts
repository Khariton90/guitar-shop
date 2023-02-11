import { ApiProperty } from '@nestjs/swagger';

export class CreateTokenDto {
  @ApiProperty({
    required: true,
    example: '63e5838c395aaeb76b11e7d7'
  })
  public userId: string;

  @ApiProperty({
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2Q5NWZjYzA0NzQ2YTY2NzM5Yjc0NzkiLCJlbWFpbCpjtYEISQ'
  })
  public refreshToken: string;
}