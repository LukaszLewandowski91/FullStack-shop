import { ConflictException, Injectable } from '@nestjs/common';
import { Images, Product } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from 'fs/promises';
@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public async create(
    files: Array<Express.Multer.File>,
    productData: Omit<Product, 'id'>,
  ): Promise<Product> {
    try {
      return await this.prismaService.product.create({
        data: {
          ...productData,
          gallery: {
            create: files.map((file) => ({ image: file.filename })),
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        files.map((file) => {
          fs.unlink(`${process.env.UPLOAD_DIR}/${file.filename}`);
        });
        throw new ConflictException('Product is already exist');
      }
      files.map((file) => {
        fs.unlink(`${process.env.UPLOAD_DIR}/${file.filename}`);
      });
      throw error;
    }
  }
}
