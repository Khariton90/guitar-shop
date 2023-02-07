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
    //  const orders = await this.productsModel.aggregate([
    //   {
    //     $lookup: {
    //       from: 'products',
    //       let: { productId: '$_id' },
    //       pipeline: [
    //         { $match: { $expr: { $in: ['$$productId', '$products'] } } },
    //       ],
    //       as: 'orders'
    //     }
    //   }
    // ]).exec()

    // console.log(orders);

    // return orders
    // return this.ordersModel.find().populate({path: 'products', select: ['title'], model: this.productsModel})
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
    throw new Error('Method not implemented.');
  }
}