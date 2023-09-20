import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
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

  // @Get('/myOrders/:email')
  // @UseGuards(JwtAuthGuard)
  // async getByEmail(@Param('email') email: string) {
  //   if (!(await this.ordersService.getByEmail(email))) {
  //     throw new NotFoundException('Order not found');
  //   }
  //   return this.ordersService.getByEmail(email);
  // }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getById(id))) {
      throw new NotFoundException('Order not found');
    }
    return this.ordersService.getById(id);
  }
}
