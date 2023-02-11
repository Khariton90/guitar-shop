import { ApiProperty } from "@nestjs/swagger";

export class RefreshTokenDto {
  @ApiProperty({
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2M2Q5NWZjYzA0NzQ2YTY2NzM5Yjc0NzkiLCJlbWFpbCpjtYEISQ',
  })
  refreshToken: string
}