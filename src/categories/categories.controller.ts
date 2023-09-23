import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDTO } from './dtos/create-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  getAll(): any {
    return this.categoriesService.getAll();
  }

  @Get('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.categoriesService.getById(id))) {
      throw new NotFoundException('Category not found');
    }
    return this.categoriesService.getById(id);
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.categoriesService.getById(id))) {
      throw new NotFoundException('Category not found');
    }
    await this.categoriesService.delete(id);
    return { success: true };
  }

  @Post('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async create(@Body() categoryData: CreateCategoryDTO) {
    return this.categoriesService.create(categoryData);
  }
}
