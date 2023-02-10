import { Product } from '@guitar-shop/shared-types';

export class CreateOrderDto {
  userId: string;
  products: Product[];
  amount: number;
  quantity: number;
}