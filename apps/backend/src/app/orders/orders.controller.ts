import { OrdersQuery } from './query/orders.query';
import { ExtendedUserRequest } from '@guitar-shop/shared-types';
import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { ResponseOrderDto } from './rdo/response-order.dto';
import { fillObject } from '@guitar-shop/core';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Delete, Get, Post, Body, UseGuards, Req, Param, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  public async find(@Query() query: OrdersQuery) {
    const orders =  await this.ordersService.find(query);
    return fillObject(ResponseOrderDto, orders);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:orderId')
  public async findById(@Param('orderId') id: string) {
    const order = await this.ordersService.findById(id);
    return fillObject(ResponseOrderDto, order);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  public async create(@Body() dto: CreateOrderDto, @Req() req: ExtendedUserRequest) {
    const newOrder = await this.ordersService.create({...dto, userId: req.user.sub});
    return newOrder;
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete('/:orderId')
  public async destroy(@Param('orderId') id: string): Promise<void> {
    await this.ordersService.destroy(id);
  }
}
