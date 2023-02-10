import { ProductTypeEnum } from "./product-type.enum";
import { StringEnum } from "./string.enum";

export interface Product {
  title: string;
  description: string;
  date: Date;
  image: string;
  type: ProductTypeEnum,
  article: string;
  strings: StringEnum,
  rating: number;
  price: number;
  feeds: number;
  id?: string;
}
