import { Injectable } from '@nestjs/common';
import { Order, OrderDetails } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductsService } from 'src/products/products.service';

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
              notes: e.notes,
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

  public getById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        order: {
          include: { product: true },
        },
      },
    });
  }

  public getByEmail(email: Order['email']): Promise<Order[]> {
    return this.prismaService.order.findMany({
      where: { email },
      include: {
        order: {
          include: { product: true },
        },
      },
    });
  }

  public delete(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }
}
