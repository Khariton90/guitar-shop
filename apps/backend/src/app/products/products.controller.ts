import { ExtendedUserRequest } from '@guitar-shop/shared-types';
import { ResponseProductDto } from './rdo/response-product.dto';
import { fillObject } from '@guitar-shop/core';
import { CreateProductDto } from './dto/create-product-dto';
import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() dto: CreateProductDto, @Req() { user }: ExtendedUserRequest) {
    const product = await this.productsService.create(dto);
    //Проверка юзера из токена
    console.log(user);

    return fillObject(ResponseProductDto, product);
  }
}
