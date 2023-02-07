import { ResponseOrderDto } from './rdo/response-order.dto';
import { fillObject } from '@guitar-shop/core';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Post, Put, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  public async find() {
    const orders =  await this.ordersService.find();
    return orders;
  // return fillObject(ResponseOrderDto, orders);
  }

  @Get('/:orderId')
  public async findById(id: string) {
    throw new Error('Method not implemented.');
  }
  
  @Post('/create')
  public async create(@Body() dto: CreateOrderDto) {
    const newOrder = await this.ordersService.create(dto);

    return newOrder;
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
