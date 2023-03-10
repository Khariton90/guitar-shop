import { CartProductItem } from "@guitar-shop/shared-types";

export type OrderDto = {
  _id?: string;
  id?: string;
  products: CartProductItem[];
  amount: number;
  quantity: number;
  date: Date;
}

export type OrderRdo = {
  id: string;
  products: CartProductItem[];
  amount: number;
  quantity: number;
  date: Date;
}
