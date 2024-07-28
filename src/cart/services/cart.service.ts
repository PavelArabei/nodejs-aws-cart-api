import { Injectable } from '@nestjs/common';
import { DbService } from '../../db/db.service';
import { Cart } from '../entities/cart.entity';
import { UpdateCartItemDto } from '../dto/updateCartItem.dto';
import { CartItem } from '../entities/cart-item.entity';
import { CartStatuses } from '../models';

@Injectable()
export class CartService {
  constructor(private db: DbService) {}

  async findByUserId(userId: string): Promise<Cart> {
    return this.db.cart.findOne(userId);
  }

  async update(card: Cart): Promise<Cart> {
    return this.db.cart.update(card);
  }

  async createByUserId(userId: string): Promise<Cart> {
    return this.db.cart.create(userId);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);
    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(
    userId: string,
    { product_id, count, isNewProduct }: UpdateCartItemDto,
  ): Promise<Cart> {
    const card = await this.findOrCreateByUserId(userId);
    card.status = CartStatuses.OPEN;
    await this.db.cart.update(card);

    if (isNewProduct) {
      const cartItem = await this.db.cartItems.findOneByCartAndProductId(
        card.id,
        product_id,
      );
      if (!cartItem) await this.db.cartItems.create(card.id, product_id, count);
    }

    await this.upgradeCartItemsByProductId(card.id, product_id, count);
    return this.findByUserId(userId);
  }

  async removeByUserId(userId: string): Promise<void> {
    await this.db.cart.removeByUserId(userId);
  }

  async upgradeCartItemsByProductId(
    cartId: string,
    productId: string,
    count: number,
  ) {
    const carts: CartItem[] = await this.db.cartItems.findByCartAndProductId(
      cartId,
      productId,
    );

    const cartItemsPromises = carts.map((cart) => {
      cart.count = count;
      return this.db.cartItems.update(cart);
    });

    await Promise.all(cartItemsPromises);
  }

  async removeAllCartsItems(cardId: string) {
    return this.db.cartItems.removeAllCartItemsByCartId(cardId);
  }

  async findAll(): Promise<Cart[]> {
    return this.db.cart.findAll();
  }
}
