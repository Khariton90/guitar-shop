import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  public async find() {
    throw new Error('Method not implemented.');
  }

  @Get('/:orderId')
  public async findById(id: string) {
    throw new Error('Method not implemented.');
  }
  
  @Post('/create')
  public async create(item: string) {
    throw new Error('Method not implemented.');
  }
  
  @Put('/:orderId')
  public async update(id: string, item: string) {
    throw new Error('Method not implemented.');
  }
  
  @Delete('/:orderId')
  public async destroy(id: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
