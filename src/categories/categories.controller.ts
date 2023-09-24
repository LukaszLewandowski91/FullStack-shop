import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateCategoryDTO } from './dtos/create-category.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multerOptions.config';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Get('/')
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
  @UseInterceptors(FilesInterceptor('image', 2, multerOptions))
  async create(
    @UploadedFiles() image: Array<Express.Multer.File>,
    @Body() categoryData: CreateCategoryDTO,
  ) {
    return this.categoriesService.create(image, categoryData);
  }
}
