import { ConflictException, Injectable } from '@nestjs/common';
import { Categories } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prismaService: PrismaService) {}

  public async create(
    categoryData: Omit<Categories, 'id'>,
  ): Promise<Categories> {
    try {
      return await this.prismaService.categories.create({
        data: categoryData,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Category is already exist');
      }
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

  public delete(id: Categories['id']): Promise<Categories> {
    return this.prismaService.categories.delete({
      where: { id },
    });
  }
}
