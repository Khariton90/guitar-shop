import { OrderItem } from '@guitar-shop/shared-types';
import { Order } from "@guitar-shop/shared-types";
import mongoose, { Document } from 'mongoose';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({
  collection: 'orders',
  timestamps: true,
  versionKey: false
})
export class OrdersModel extends Document implements Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'products' })
  products: mongoose.Schema.Types.ObjectId[]

  @Prop({
    required: true
  })
  userId: string;

  @Prop({
    required: true,
    min: 1,
  })
  quantity: number;

  @Prop({
    isInteger: true,
    required: true
  })
  amount: number;

  @Prop({
    required: true
  })
  date: Date;
}

export const OrdersSchema = SchemaFactory.createForClass(OrdersModel);