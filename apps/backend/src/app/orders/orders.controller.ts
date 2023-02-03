import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {}
