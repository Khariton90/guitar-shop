import { CartProductItem } from '@guitar-shop/shared-types';
import { Order } from "@guitar-shop/shared-types";

export class OrdersEntity implements Order {
  _id?: string;
  userId: string;
  products: CartProductItem[];
  quantity: number;
  date: Date;
  amount: number;
  
  constructor(order: Order) {
    this.fillEntity(order);
  }

  public fillEntity(order: Order) {
    this._id = order._id
    this.userId = order.userId
    this.products = order.products
    this.quantity = order.quantity
    this.amount = order.amount
    this.date = order.date
  }

  public toObject() {
    return {...this};
  }
}