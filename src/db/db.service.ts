import { CartDbService } from './db-services/cart.db.service';
import { Injectable } from '@nestjs/common';
import { UserDbService } from './db-services/user.db.service';
import { OrderDbService } from './db-services/order.db.service';
import { CartItemDbService } from './db-services/cart-item.db.service';

@Injectable()
export class DbService {
  constructor(
    private readonly cartDbService: CartDbService,
    private readonly userDbService: UserDbService,
    private readonly orderDbService: OrderDbService,
    private readonly cartItemDbService: CartItemDbService,
  ) {}

  get cart() {
    return this.cartDbService;
  }

  get users() {
    return this.userDbService;
  }

  get orders() {
    return this.orderDbService;
  }

  get cartItems() {
    return this.cartItemDbService;
  }
}
