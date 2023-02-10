import { ProductDto } from './../../../../apps/frontend/src/types/product.dto';

export type CartProductItem  = {
  product:  ProductDto,
  qty: number;
}