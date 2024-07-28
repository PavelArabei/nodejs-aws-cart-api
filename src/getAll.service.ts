import { Injectable } from '@nestjs/common';
import { DbService } from './db/db.service';

@Injectable()
export class GetAllService {
  constructor(private readonly db: DbService) {}

  async getAllOrders() {
    return await this.db.orders.findAll();
  }

  async getAllCarts() {
    return await this.db.cart.findAll();
  }

  async getAllUsers() {
    return await this.db.users.findAll();
  }

  async getAllCartItems() {
    return await this.db.cartItems.findAll();
  }
}
