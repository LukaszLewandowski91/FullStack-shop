import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
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

  @Get('/')
  getAll(): any {
    return this.productsService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getById(id))) {
      throw new NotFoundException('Product not found');
    }
    return this.productsService.getById(id);
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productsService.getById(id))) {
      throw new NotFoundException('Product not found');
    }
    await this.productsService.delete(id);
    return { success: true };
  }

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
