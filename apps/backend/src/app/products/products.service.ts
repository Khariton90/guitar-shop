import { CreateProductDto } from './dto/create-product-dto';
import { Injectable } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { ProductsEntity } from './products.entity';
import dayjs from 'dayjs';

@Injectable()
export class ProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(dto: CreateProductDto) {
    const productEntity = new ProductsEntity({
      ...dto,
      date: dayjs(Date.now()).toDate(),
      feeds: 1,
      rating: 1
    });

    return await this.productsRepository.create(productEntity);
  }
}
