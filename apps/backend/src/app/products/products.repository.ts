import { ProductsQuery } from './query/products.query';
import { DEFAULT_LIMIT_PRODUCTS } from './products.constant';
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
    const pageOptions = {
      page: query.skip > 1 ? query.skip - 1 : 0,
      price: query.price || 1,
      rating: query.rating || 1,
      date: query.date || -1,
      limit: DEFAULT_LIMIT_PRODUCTS,
  }

      const products = await this.productsModel.find()
      .sort([
        ['price', pageOptions.price], 
        ['rating', pageOptions.rating], 
        ['date', pageOptions.date]])
      .limit(DEFAULT_LIMIT_PRODUCTS)
      .skip(pageOptions.page * pageOptions.limit).exec();

      return products;
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

  public async getTotalCount(): Promise<number | undefined> {
    const count = await this.productsModel.count();
    return count;
  }
}