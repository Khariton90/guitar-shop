import { OrdersModel } from './orders.model';
import { InjectModel } from '@nestjs/mongoose';
import { OrdersEntity } from './orders.entity';
import { CRUDRepository } from '@guitar-shop/core';
import { Order } from '@guitar-shop/shared-types';
import { Model } from 'mongoose';


export class OrdersRepository implements CRUDRepository<OrdersEntity, string, Order> {
  constructor(
    @InjectModel(OrdersModel.name) private readonly ordersModel: Model<OrdersModel>
  ) { }

  public async findById(id: string): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  
  public async create(item: OrdersEntity): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  
  public async update(id: string, item: OrdersEntity): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  
  public async destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}