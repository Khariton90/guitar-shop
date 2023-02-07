import { OrderItem } from "@guitar-shop/shared-types";
import { Expose, Transform } from "class-transformer";

export class ResponseOrderDto {
  @Expose()
  public userId: string;
  
  @Expose()
  @Transform(({obj}) => [obj.products])
  public products!: []

  @Expose()
  public amount: number;

  @Expose()
  public quantity: number;
}