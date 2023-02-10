import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from './orders.repository';
import { Injectable } from '@nestjs/common';
import { OrdersEntity } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async find() {
    const orders = await this.ordersRepository.find();
    return orders;
  }

  public async findById(id: string) {
    throw new Error('Method not implemented.');
  }
  
  public async create(dto: CreateOrderDto) {
    const orderEntity = new OrdersEntity(dto);
    return await this.ordersRepository.create(orderEntity);
  }
  
  public async update(id: string, item: string) {
    throw new Error('Method not implemented.');
  }
  
  public async destroy(id: string): Promise<void> {
    await this.ordersRepository.destroy(id);
  }
}
