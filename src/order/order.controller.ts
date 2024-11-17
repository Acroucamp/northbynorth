import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Order')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return await this.orderService.createOrder(createOrderDto);
  }

  @Get()
  async getOrders(): Promise<Order[]> {
    const orders = await this.orderService.getOrders();

    if (!orders) {
      throw new NotFoundException('No orders found');
    }

    return orders;
  }

  @Get(':orderNumber')
  async getOrderByOrderNumber(
    @Param('orderNumber') orderNumber,
  ): Promise<Order> {
    const order = await this.orderService.getOrderByOrderNumber(orderNumber);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  @Patch(':orderNumber')
  async updateOrder(
    @Param('orderNumber') orderNumber,
    @Body() updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order = await this.getOrderByOrderNumber(orderNumber);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return await this.orderService.updateOrder(orderNumber, updateOrderDto);
  }

  @Delete(':orderNumber')
  async deleteOrder(@Param('orderNumber') orderNumber): Promise<void> {
    return await this.orderService.deleteOrder(orderNumber);
  }
}
