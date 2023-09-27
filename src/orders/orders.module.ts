import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ProductsModule } from 'src/products/products.module';
import { ProductsService } from 'src/products/products.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [PrismaModule],
})
export class OrdersModule {}
