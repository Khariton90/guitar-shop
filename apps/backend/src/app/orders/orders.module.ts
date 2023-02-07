import { ProductsModel, ProductSchema } from './../products/products.model';
import { OrdersController } from './orders.controller';
import { OrdersModel, OrdersSchema } from './orders.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrdersModel.name, schema: OrdersSchema },
      { name: ProductsModel.name, schema: ProductSchema },
    ])
  ],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController]
})
export class OrdersModule {}
