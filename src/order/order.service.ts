import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  /**
   * Get Orders
   * @returns List of orders
   */
  async getOrders(): Promise<Order[]> {
    // Retrieve all orders from the database
    const orders = await this.orderRepository.find();

    // If no orders are found, throw a NotFoundException
    if (!orders) {
      throw new NotFoundException('No orders found');
    }

    // Return the list of orders
    return orders;
  }

  /**
   * Retrieve order details by orderNumber
   * @param orderId - The order number of the order that needs to be retrieved.
   * @returns The order based on the order number.
   */
  async getOrderByOrderNumber(orderNumber: string): Promise<Order> {
    // Attempt to retrieve the order by orderNumber
    const order = await this.orderRepository.findOne({
      where: { order_number: orderNumber },
    });

    // If order is not found, throw a NotFoundException
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Return the order entity
    return order;
  }

  // async getOrderByCustomerName(customer_name: string): Promise<Order[]> {
  //   const orders = await this.orderRepository.find({
  //     where: { customer_name: customer_name }
  //   })
  // }

  /**
   * Creates a new order in the database.
   * @param createOrderDto - The data transfer object containing order details.
   * @returns The newly created order entity.
   */
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    // Create a new order entity
    const order = this.orderRepository.create(createOrderDto);

    // Save the order entity to the database
    return await this.orderRepository.save(order);
  }

  /**
   * Updates an existing order in the database.
   * @param orderNumber - The unique identifier for the order to be updated.
   * @param updateOrderDto - The data transfer object containing updated order information.
   * @returns The updated order entity.
   * @throws NotFoundException if the order with the specified orderNumber is not found.
   */
  async updateOrder(
    orderNumber: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    // Attempt to retrieve the order by orderNumber
    const order = await this.orderRepository.findOne({
      where: { order_number: orderNumber },
    });

    // If order is not found, throw a NotFoundException
    if (!order) {
      throw new NotFoundException('Order not found');
    }

    // Merge the updates from the updateOrderDto into the order entity
    Object.assign(order, updateOrderDto);

    // Save the updated order entity to the database
    return await this.orderRepository.save(order);
  }

  /**
   * Deletes an order from the database by orderNumber.
   * @param orderNumber - The unique identifier for the order to be deleted.
   * @throws NotFoundException if the order with the specified orderNumber is not found.
   */
  async deleteOrder(orderNumber: string): Promise<void> {
    // Attempt to delete the order by orderNumber
    const result = await this.orderRepository.delete({
      order_number: orderNumber,
    });

    // If now rows were affected, then the order was not found, throw NotFoundException
    if (result.affected === 0) {
      throw new NotFoundException('Order not found');
    }
  }
}
