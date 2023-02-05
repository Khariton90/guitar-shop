import { Document } from 'mongoose';
import { Product, ProductTypeEnum, StringEnum } from '@guitar-shop/shared-types';
import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';

@Schema({
  collection: 'products',
  timestamps: true
})
export class ProductsModel extends Document implements Product {
  @Prop({
    required: true,
    minlength: 10,
    maxlength: 100
  })
  title: string;

  @Prop({
    required: true,
    minlength: 20,
    maxlength: 1024
  })
  description: string;

  @Prop({
    required: true,
  })
  date: Date;

  @Prop({
    required: true,
  })
  image: string;

  @Prop({
    required: true,
    type: String,
    enum: ProductTypeEnum,
    default: ProductTypeEnum.Ukulele
  })
  type: ProductTypeEnum;

  @Prop({
    required: true,
    minlength: 5,
    maxlength: 40
  })
  article: string;

  @Prop({
    required: true,
    type: String,
    enum: StringEnum,
    default: StringEnum.Four
  })
  strings: StringEnum;

  @Prop({
    required: true,
    min: 0,
    max: 5,
    default: 0
  })
  rating: number;

  @Prop({
    required: true,
    min: 100,
    max: 1000000,
    default: 100
  })
  price: number;

  feeds: number;
}

export const ProductSchema = SchemaFactory.createForClass(ProductsModel);