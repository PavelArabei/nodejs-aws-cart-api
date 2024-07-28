import { Module } from '@nestjs/common';

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';
import { DbModule } from './db/db.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './orm.config';
import { GetAllService } from './getAll.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    DbModule.forRoot(),
    AuthModule,
    CartModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [GetAllService],
})
export class AppModule {}
