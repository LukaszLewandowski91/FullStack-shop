import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrderDTO } from './dtos/create-order.dto';

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
}
