import { OrdersRepository } from './orders.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  public async findById(id: string) {
    throw new Error('Method not implemented.');
  }
  
  public async create(item: string) {
    throw new Error('Method not implemented.');
  }
  
  public async update(id: string, item: string) {
    throw new Error('Method not implemented.');
  }
  
  public async destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
