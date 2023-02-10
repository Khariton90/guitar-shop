import { ProductsModel } from './../products/products.model';
import { OrdersModel } from './orders.model';
import { InjectModel } from '@nestjs/mongoose';
import { OrdersEntity } from './orders.entity';
import { Model } from 'mongoose';


export class OrdersRepository {
  constructor(
    @InjectModel(OrdersModel.name) private readonly ordersModel: Model<OrdersModel>,
    @InjectModel(ProductsModel.name) private readonly productsModel: Model<ProductsModel>,
  ) { }
  
  public async find() {
    const orders = await this.ordersModel.find({});
    return orders;
  }

  public async findById(id: string) {
    const order = await this.ordersModel.findById(id);
    return order;
  }
  
  public async create(item: OrdersEntity) {
    const newOrder = new this.ordersModel(item);
    return newOrder.save();
  }

  public async destroy(id: string) {
    await this.ordersModel.findByIdAndDelete(id);
  }
}