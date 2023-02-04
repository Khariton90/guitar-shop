import { ProductTypeEnum, StringEnum } from "@guitar-shop/shared-types";

export interface ProductDto {
  id: string;
  title: string;
  description: string;
  date: Date | string;
  image: string;
  type: ProductTypeEnum,
  article: string;
  strings: StringEnum,
  price: number;
  rating?: number;
  feeds?: number;
}
