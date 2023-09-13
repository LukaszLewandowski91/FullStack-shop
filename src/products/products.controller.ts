import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { CreateProductDTO } from './dtos/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  create(@Body() productData: CreateProductDTO) {
    return this.productsService.create(productData);
  }
}
