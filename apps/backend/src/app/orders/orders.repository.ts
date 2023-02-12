import { OrdersQuery } from './query/orders.query';
import { OrdersModel } from './orders.model';
import { InjectModel } from '@nestjs/mongoose';
import { OrdersEntity } from './orders.entity';
import { Model } from 'mongoose';

const DEFAULT_LIMIT_ORDERS = 9;

export class OrdersRepository {
  constructor(
    @InjectModel(OrdersModel.name) private readonly ordersModel: Model<OrdersModel>,
  ) { }

  public async find(query: OrdersQuery) {
    const pageOptions = {
      page: query.skip > 1 ? query.skip - 1 : 0,
      price: query.price || 1,
      date: query.date || -1,
      limit: DEFAULT_LIMIT_ORDERS,
    }

    const orders = await this.ordersModel.find({}).sort([
      ['price', pageOptions.price],
      ['date', pageOptions.date]])
      .limit(DEFAULT_LIMIT_ORDERS)
      .skip(pageOptions.page * pageOptions.limit).exec();
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