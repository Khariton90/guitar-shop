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

  public async findById(id: string): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  
  public async create(item: ProductsEntity): Promise<Product> {
    const product = new this.productsModel(item);
    return product.save();
  }
  
  public async update(id: string, item: ProductsEntity): Promise<Product> {
    throw new Error('Method not implemented.');
  }
  
  public async destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}