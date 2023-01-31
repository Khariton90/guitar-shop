import { Order } from "@guitar-shop/shared-types";
import { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({
  collection: 'orders'
})
export class OrdersModel extends Document implements Order {
  @Prop()
  product: string;

  @Prop({
    isInteger: true
  })
  price: number;

  @Prop({
    required: true,
    min: 1,
  })
  quantity: number;

  @Prop({
    isInteger: true
  })
  amountPrice: number;

  @Prop({
    isInteger: true,
    min: 1,
    default: 1
  })
  amountProduct: number;

  @Prop({
    required: true
  })
  date: Date;
}

export const OrdersSchema = SchemaFactory.createForClass(OrdersModel);