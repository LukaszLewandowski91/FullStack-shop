import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  async create(@Body() orderData: CreateOrderDTO) {
    const order = orderData.order;
    // const { order, ...otherData } = orderData;
    return await this.ordersService.create(orderData, order);
  }

  @Get('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  getAll(): any {
    return this.ordersService.getAll();
  }
}
