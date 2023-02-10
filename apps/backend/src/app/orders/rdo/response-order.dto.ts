import { CartProductItem } from "@guitar-shop/shared-types";
import { Expose, Transform } from "class-transformer";

export class ResponseOrderDto {
  @Expose()
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public id: string;

  @Expose()
  public userId: string;
  
  @Expose()
  public products: CartProductItem[]

  @Expose()
  public amount: number;

  @Expose()
  public quantity: number;
}