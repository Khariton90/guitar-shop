import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersEntity } from './orders.entity';
import { OrdersQuery } from './query/orders.query';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async find(query: OrdersQuery) {
    const orders = await this.ordersRepository.find(query);
    return orders;
  }

  public async findById(id: string) {
    const existOrder = await this.ordersRepository.findById(id);

    if (!existOrder) {
      throw new NotFoundException();
    }

    return existOrder;
  }
  
  public async create(dto: CreateOrderDto) {
    const orderEntity = new OrdersEntity(dto);
    return await this.ordersRepository.create(orderEntity);
  }
  
  public async destroy(id: string): Promise<void> {
    await this.ordersRepository.destroy(id);
  }
}
