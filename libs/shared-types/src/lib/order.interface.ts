import { CartProductItem } from '@guitar-shop/shared-types';

export interface Order {
  _id?: string;
  userId: string;
  products: CartProductItem[];
  amount: number;
  quantity: number;
  date: Date;
}