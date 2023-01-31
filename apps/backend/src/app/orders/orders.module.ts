import { OrdersController } from './orders.controller';
import { OrdersModel, OrdersSchema } from './orders.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: OrdersModel.name, schema: OrdersSchema }
    ])
  ],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
