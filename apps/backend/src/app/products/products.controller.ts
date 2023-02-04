import { ApiTags } from '@nestjs/swagger';
import { ExtendedUserRequest } from '@guitar-shop/shared-types';
import { ResponseProductDto } from './rdo/response-product.dto';
import { fillObject } from '@guitar-shop/core';
import { CreateProductDto } from './dto/create-product-dto';
import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards, Req, Get, Param, Res } from '@nestjs/common';
import { ProductsService } from './products.service';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // @UseGuards(JwtAuthGuard)
  @Post('/')
  async create(@Body() dto: CreateProductDto, @Req() { user }: ExtendedUserRequest) {
    const product = await this.productsService.create(dto);
    return fillObject(ResponseProductDto, product);
  }

  @Get('/')
  async findAll() {
    const productList = await this.productsService.find();
    return fillObject(ResponseProductDto, productList);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findById(id);
    return fillObject(ResponseProductDto, product);
  }

  @Get('images/:filename')
  async getImage(@Param('filename') filename: string, @Res() res) {
    res.sendFile(filename, {root: './apps/public'});
  }
}
