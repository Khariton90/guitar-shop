import { ProductsModel } from './../products/products.model';
import { OrdersModel } from './orders.model';
import { InjectModel } from '@nestjs/mongoose';
import { OrdersEntity } from './orders.entity';
import { CRUDRepository } from '@guitar-shop/core';
import { Order } from '@guitar-shop/shared-types';
import { Model } from 'mongoose';


export class OrdersRepository implements CRUDRepository<OrdersEntity, string, Order> {
  constructor(
    @InjectModel(OrdersModel.name) private readonly ordersModel: Model<OrdersModel>,
    @InjectModel(ProductsModel.name) private readonly productsModel: Model<ProductsModel>,
  ) { }
  
  public async find() {
    const orders = await this.ordersModel.find({});
    return orders;
  }

  public async findById(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  
  public async create(item: OrdersEntity): Promise<Order> {
    const newOrder = new this.ordersModel(item);
    return newOrder.save();
  }
  
  public async update(id: string, item: OrdersEntity): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  
  public async destroy(id: string): Promise<void> {
    await this.ordersModel.findByIdAndDelete(id);
  }
}