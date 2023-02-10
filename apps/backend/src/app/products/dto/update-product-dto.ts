import { ApiProperty } from '@nestjs/swagger';
import { ProductTypeEnum, StringEnum } from "@guitar-shop/shared-types";

export class UpdateProductDto {
  @ApiProperty({
    required: true,
    example: 'Liana Z100',
  })
  title: string;

  @ApiProperty({
    required: true,
    example: 'Liana Z100',
  })
  description: string;
  date: Date;

  @ApiProperty({
    required: true,
    default: '',
    example: 'image.png',
  })
  image: string;

  @ApiProperty({
    required: true,
    example: 'электро',
  })
  type: ProductTypeEnum;

  @ApiProperty({
    required: true,
    example: '1',
  })
  article: string;

  @ApiProperty({
    required: true,
    example: '4',
  })
  strings: StringEnum;

  @ApiProperty({
    required: true,
    example: '100',
  })
  price: number;
}