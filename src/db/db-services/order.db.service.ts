import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../../order/entities/order.entity';
import { OrderDto } from '../../order';

@Injectable()
export class OrderDbService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOneById(id: string): Promise<Order> {
    return this.orderRepository.findOneBy({ id });
  }

  async findAllOrdersByUserId(userId: string): Promise<Order[]> {
    return this.orderRepository.find({ where: { user_id: userId } });
  }

  async create(order: OrderDto): Promise<Order> {
    const newOrder = new Order();
    newOrder.payment = {};
    Object.assign(newOrder, order);
    return await this.orderRepository.save(newOrder);
  }

  delete(id: string) {
    return this.orderRepository.delete(id);
  }
}
