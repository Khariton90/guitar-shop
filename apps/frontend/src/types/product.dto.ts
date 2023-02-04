import { ProductTypeEnum, StringEnum } from "@guitar-shop/shared-types";

export interface ProductDto {
  id: string;
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
}
