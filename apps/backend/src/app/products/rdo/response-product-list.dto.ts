import { Expose, Type } from 'class-transformer';
import { ResponseProductDto } from './response-product.dto';

export class ResponseProductListDto {
  @Type(() => ResponseProductDto)
  @Expose()
  public products: ResponseProductDto[];

  @Expose()
  public total: number
}