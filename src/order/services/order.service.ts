import { Injectable } from '@nestjs/common';

import { DbService } from '../../db/db.service';
import { Order } from '../entities/order.entity';
import { OrderDto } from '../models';

@Injectable()
export class OrderService {
  constructor(private readonly db: DbService) {}

  async findAllOrdersByUserId(userId: string): Promise<Order[]> {
    return this.db.orders.findAllOrdersByUserId(userId);
  }

  async create(order: OrderDto): Promise<Order> {
    return this.db.orders.create(order);
  }

  async deleteOrder(id: string) {
    return this.db.orders.delete(id);
  }
}
