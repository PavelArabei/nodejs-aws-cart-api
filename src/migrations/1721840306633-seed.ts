import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Cart } from '../cart/entities/cart.entity';
import { CartItem } from '../cart/entities/cart-item.entity';
import { Order } from '../order/entities/order.entity';
import { CartStatuses } from '../cart';
import { OrderStatuses } from '../order';

export class Seed1721840306633 implements MigrationInterface {
  name = 'seed1721840306633';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    user.name = 'pavelarabei';
    user.password = 'TEST_PASSWORD';
    const newUser = await queryRunner.manager.save(user);

    const cart = new Cart();
    cart.user_id = newUser.id;
    cart.user = newUser;
    cart.status = CartStatuses.OPEN;
    const newCart = await queryRunner.manager.save(cart);

    const cartItem1 = new CartItem();
    cartItem1.cart = newCart;
    cartItem1.count = 2;
    cartItem1.cart_id = newCart.id;
    cartItem1.product_id = '5df7cc40-eeb6-4a78-81f4-cfea79fd7945';
    await queryRunner.manager.save(cartItem1);

    const cartItem2 = new CartItem();
    cartItem2.cart = newCart;
    cartItem2.count = 2;
    cartItem2.cart_id = newCart.id;
    cartItem2.product_id = 'ebb323c1-eecb-4677-8837-bb8dae8b29c0';

    await queryRunner.manager.save(cartItem2);

    const delivery = {
      address: 'some address',
      firstName: 'Name',
      lastName: 'Surname',
      comment: '',
    };

    const order = new Order();
    order.user = user;
    order.cart = cart;
    order.delivery = delivery;
    order.status = OrderStatuses.CREATED;
    order.payment = {};
    await queryRunner.manager.save(order);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "order"`);
    await queryRunner.query(`DELETE FROM "cart_items"`);
    await queryRunner.query(`DELETE FROM "carts"`);
    await queryRunner.query(`DELETE FROM "users"`);
  }
}
