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

  @Transform(({ value }) => Number(value))
  @IsOptional()
  public date: -1 | 1;
}