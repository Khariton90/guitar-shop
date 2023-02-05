import { DEFAULT_SORT_DIRECTION } from './../products.constant';
import {IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductsQuery {

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public price: -1 | 1;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public rating: -1 | 1;

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public skip: number;
}