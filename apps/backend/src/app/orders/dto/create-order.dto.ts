import { OrderItem } from '@guitar-shop/shared-types';

export class CreateOrderDto {
  userId: string;
  products: OrderItem[];
  amount: number;
  quantity: number;
}