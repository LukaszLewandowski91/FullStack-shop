import { Injectable } from '@nestjs/common';
import { Order, OrderDetails } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public async create(orderData: Omit<Order, 'id'>, order): Promise<Order> {
    try {
      return await this.prismaService.order.create({
        data: {
          ...orderData,
          order: {
            create: order.map((e) => ({
              quantity: e.quantity,
              productId: e.productId,
            })),
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        order: {
          include: { product: true },
        },
      },
    });
  }
}
