import { ExtendedUserRequest } from '@guitar-shop/shared-types';
import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { ResponseOrderDto } from './rdo/response-order.dto';
import { fillObject } from '@guitar-shop/core';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Post, Put, Body, UseGuards, Req, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('/')
  public async find() {
    const orders =  await this.ordersService.find();
    return fillObject(ResponseOrderDto, orders);
  }

  @Get('/:orderId')
  public async findById(id: string) {
    throw new Error('Method not implemented.');
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  public async create(@Body() dto: CreateOrderDto, @Req() req: ExtendedUserRequest) {
    const newOrder = await this.ordersService.create({...dto, userId: req.user.sub});

    return newOrder;
  }
  
  @Put('/:orderId')
  public async update(id: string, item: string) {
    throw new Error('Method not implemented.');
  }
  
  @Delete('/:orderId')
  public async destroy(@Param('orderId') id: string): Promise<void> {
    await this.ordersService.destroy(id);
  }
}
