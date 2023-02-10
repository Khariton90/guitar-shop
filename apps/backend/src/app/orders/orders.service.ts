import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { OrdersEntity } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async find() {
    const orders = await this.ordersRepository.find();
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
