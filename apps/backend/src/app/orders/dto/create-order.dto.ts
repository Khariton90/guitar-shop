import { CartProductItem } from '@guitar-shop/shared-types';

export class CreateOrderDto {
  userId: string;
  products: CartProductItem[];
  amount: number;
  quantity: number;
  date: Date;
}