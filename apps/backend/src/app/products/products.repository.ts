import { ProductsQuery } from './query/products.query';
import { DEFAULT_LIMIT_PRODUCTS, DEFAULT_SORT_DIRECTION } from './products.constant';
import { ProductsModel } from './products.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Product } from '@guitar-shop/shared-types';
import { ProductsEntity } from './products.entity';
import { CRUDRepository } from "@guitar-shop/core";
import { Model } from 'mongoose';

@Injectable()
export class ProductsRepository implements CRUDRepository<ProductsEntity, string, Product> {

  constructor(
    @InjectModel(ProductsModel.name) private readonly productsModel: Model<ProductsModel>
  ){}

  public async find(query: ProductsQuery): Promise<Product[] | []> {
    const sortingType = Object.entries(query);

    if (sortingType.length) {
      return await this.productsModel.find()
      .sort([...sortingType])
      .limit(DEFAULT_LIMIT_PRODUCTS)
      .exec();
    }

    return await this.productsModel.find()
      .sort({date: -1})
      .limit(DEFAULT_LIMIT_PRODUCTS)
      .exec();
  }
  

  public async findById(id: string): Promise<Product> {
    const existProduct = this.productsModel.findById(id);
    return existProduct;
  }
  
  public async create(item: ProductsEntity): Promise<Product> {
    const product = new this.productsModel(item);
    return product.save();
  }
  
  public async update(id: string, item: ProductsEntity): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  
  public async destroy(id: string): Promise<void> {
    await this.productsModel.findOneAndDelete({id});
  }
}