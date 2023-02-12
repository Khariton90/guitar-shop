import { Product, ProductTypeEnum, StringEnum } from "@guitar-shop/shared-types";

export class ProductsEntity implements Product {
  _id?: string;
  title: string;
  description: string;
  date: Date;
  image: string;
  type: ProductTypeEnum;
  article: string;
  strings: StringEnum;
  rating: number;
  price: number;
  feeds: number;

  constructor(product: Product) {
    this.fillEntity(product);
  }

  public fillEntity(product: Product) {
    this.title = product.title;
    this.description = product.description;
    this.date = product.date;
    this.image = product.image;
    this.type = product.type;
    this.article = product.article;
    this.strings = product.strings;
    this.rating = product.rating;
    this.price = product.price;
    this.feeds = product.feeds;
  }

  public toObject() {
    return {...this};
  }
}