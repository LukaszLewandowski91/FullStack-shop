import { ConflictException, Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs/promises';
@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  public async create(
    image: Array<Express.Multer.File>,
    categoryData: Omit<Categories, 'id' | 'image'>,
  ): Promise<Categories> {
    try {
      return await this.prismaService.categories.create({
        data: {
          description: categoryData.description,
          image: image[0].filename,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        fs.unlink(`${process.env.UPLOAD_DIR}/${image[0].filename}`);
        throw new ConflictException('Category is already exist');
      }
      fs.unlink(`${process.env.UPLOAD_DIR}/${image[0].filename}`);
      throw error;
    }
  }

  public getAll(): Promise<Categories[]> {
    return this.prismaService.categories.findMany();
  }

  public getById(id: Categories['id']): Promise<Categories | null> {
    return this.prismaService.categories.findUnique({
      where: { id },
    });
  }

  public async delete(id: Categories['id']): Promise<Categories> {
    const category = await this.prismaService.categories.findUnique({
      where: { id },
    });

    fs.unlink(`${process.env.UPLOAD_DIR}/${category.image}`);

    return this.prismaService.categories.delete({
      where: { id },
    });
  }
}
