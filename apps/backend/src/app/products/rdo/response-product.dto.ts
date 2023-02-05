import { ApiProperty } from '@nestjs/swagger';
import { ProductTypeEnum, StringEnum } from "@guitar-shop/shared-types";
import { Transform, Expose } from 'class-transformer';

export class ResponseProductDto {
  @ApiProperty({
    required: true,
    example: '63d9723cccdad0cfc38aacf5',
  })
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  id: string;

  @ApiProperty({
    required: true,
    example: 'Liana Z100',
  })
  @Expose()
  title: string;

  @ApiProperty({
    required: true,
    example: 'Liana Z100',
  })
  @Expose()
  description: string;

  @Expose()
  date: Date;

  @ApiProperty({
    required: true,
    example: 'image.png',
  })
  @Expose()
  image: string;

  @ApiProperty({
    required: true,
    example: 'электро',
  })
  @Expose()
  type: ProductTypeEnum;

  @ApiProperty({
    required: true,
    example: '1',
  })
  @Expose()
  article: string;

  @ApiProperty({
    required: true,
    example: '4',
  })
  @Expose()
  strings: StringEnum;

  @ApiProperty({
    required: true,
    example: '100',
  })
  @Expose()
  price: number;

  @ApiProperty({
    required: true,
    example: '1',
  })
  @Expose()
  rating: number;
}