import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { CartItem } from '../../cart/entities/cart-item.entity';

@Injectable()
export class CartItemDbService {
  constructor(
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  public async findAll(): Promise<CartItem[]> {
    return await this.cartItemRepository.find();
  }

  public async findOne(id: string): Promise<CartItem> {
    return await this.cartItemRepository.findOne({
      where: { cart_id: id },
      relations: ['cart_id'],
    });
  }

  public async findByCartAndProductId(
    cartId: string,
    productId: string,
  ): Promise<CartItem[]> {
    return await this.cartItemRepository.find({
      where: { cart_id: cartId, product_id: productId },
    });
  }
  public async findOneByCartAndProductId(
    cartId: string,
    productId: string,
  ): Promise<CartItem> {
    return await this.cartItemRepository.findOne({
      where: { cart_id: cartId, product_id: productId },
    });
  }

  removeAllCartItemsByCartId(cartId: string): Promise<DeleteResult> {
    return this.cartItemRepository.delete({ cart_id: cartId });
  }

  public async create(
    cartId: string,
    productId: string,
    count = 1,
  ): Promise<CartItem> {
    const cart = new CartItem();
    cart.cart_id = cartId;
    cart.product_id = productId;
    cart.count = count;
    return this.cartItemRepository.save(cart);
  }

  public async update(cart: CartItem): Promise<CartItem> {
    return await this.cartItemRepository.save(cart);
  }

  public async remove(id: string): Promise<DeleteResult> {
    return await this.cartItemRepository.delete(id);
  }
}
