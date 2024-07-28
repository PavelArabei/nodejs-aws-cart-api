import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartDbService } from './db-services/cart.db.service';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { Order } from '../order/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { UserDbService } from './db-services/user.db.service';
import { OrderDbService } from './db-services/order.db.service';
import { CartItemDbService } from './db-services/cart-item.db.service';

@Global()
@Module({
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {
  static forRoot(): any {
    return {
      module: DbModule,
      imports: [TypeOrmModule.forFeature([Cart, CartItem, Order, User])],
      providers: [
        DbService,
        CartDbService,
        UserDbService,
        OrderDbService,
        CartItemDbService,
      ],
      exports: [DbService],
    };
  }
}
