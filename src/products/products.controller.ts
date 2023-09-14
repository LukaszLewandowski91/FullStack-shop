import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { CreateProductDTO } from './dtos/create-product.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs/promises';
import { multerOptions } from 'src/config/multerOptions.config';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files', 5, multerOptions))
  async create(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() productData: CreateProductDTO,
  ) {
    return await this.productsService.create(files, productData);
  }
}
