import { Order } from "@guitar-shop/shared-types";

export class OrdersEntity implements Order {
  _id?: string;
  product: string;
  price: number;
  quantity: number;
  amountPrice: number;
  amountProduct: number;
  date: Date;
  
  constructor(order: Order) {
    this.fillEntity(order);
  }

  public fillEntity(order: Order) {
    this._id = order._id
    this.product = order.product
    this.price = order.price
    this.quantity = order.quantity
    this.amountPrice = order.amountPrice
    this.amountProduct = order.amountProduct
    this.date = order.date
  }

  public toObject() {
    return {...this};
  }
}