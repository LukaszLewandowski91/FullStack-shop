import { ConflictException, Injectable } from '@nestjs/common';
import { Images, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public async create(productData: Omit<Product, 'id'>): Promise<Product> {
    try {
      const product = await this.prismaService.product.create({
        data: productData,
      });

      return product;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Product is already exist');
      }
      throw error;
    }
  }
}
