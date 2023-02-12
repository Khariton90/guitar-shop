import { ResponseProductListDto } from './rdo/response-product-list.dto';
import { ProductsQuery } from './query/products.query';
import { BASE_IMAGES_URL } from './products.constant';
import { ApiTags } from '@nestjs/swagger';
import { ResponseProductDto } from './rdo/response-product.dto';
import { fillObject } from '@guitar-shop/core';
import { CreateProductDto } from './dto/create-product-dto';
import { JwtAuthGuard } from './../guards/jwt-auth.guard';
import { Body, Controller, Post, UseGuards, Get, Param, Res, UploadedFile, UseInterceptors, Query, Delete, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import dayjs from 'dayjs';

type File = Express.Multer.File;

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() dto: CreateProductDto) {
    const product = await this.productsService.create(dto);
    return fillObject(ResponseProductDto, product);
  }

  @Get('/')
  async findAll(@Query() query: ProductsQuery) {
    const [products, total] = await this.productsService.find(query);
    return fillObject(ResponseProductListDto, {products, total});
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

  @UseGuards(JwtAuthGuard)
  @Post('images/upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './apps/public',
      filename: (req, file, cb) => {
        const fileExtention = file.originalname.split('.')[1];
        const newFileName = `catalog-product-${dayjs().format('YYYY-MM-DDTHH-mm-ss')}.${fileExtention}`
        cb(null, newFileName);
      }
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(null, false);
      }

      cb(null, true);
    }
  }))
  async uploadImage(@UploadedFile() file: File) {
    const response = `${BASE_IMAGES_URL}${file.filename}`
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete/:id')
  async delete(@Param('id') id: string) {
    await this.productsService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('/update/:id')
  async update(@Param('id') id: string, @Body() dto: CreateProductDto) {
    const product = await this.productsService.update(id, dto);
    return fillObject(ResponseProductDto, product);
  }
}

