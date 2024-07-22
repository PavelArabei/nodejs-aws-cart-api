import { Global, Module } from '@nestjs/common';
import { DbService } from './db.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartDbService } from './db-services/cart.db.service';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { Order } from '../order/entities/order.entity';
import { User } from '../users/entities/user.entity';

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
      providers: [DbService, CartDbService],
      exports: [DbService],
    };
  }
}
