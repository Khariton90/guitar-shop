import { OrderItem } from "./order-item.interface";

export interface Order {
  _id?: string;
  userId: string;
  products: any;
  amount: number;
  quantity: number;
  date: Date;
}