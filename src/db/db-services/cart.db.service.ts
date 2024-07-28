import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartDbService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  public async findAll() {
    return await this.cartRepository.find();
  }

  public async findOne(id: string) {
    return await this.cartRepository.findOne({
      where: { user_id: id },
      relations: ['items'],
    });
  }

  public async create(userId: string): Promise<Cart> {
    const cart = new Cart();
    cart.user_id = userId;
    return this.cartRepository.save(cart);
  }

  public async update(cart: Cart) {
    return this.cartRepository.save(cart);
  }

  public async remove(id: string) {
    return await this.cartRepository.delete(id);
  }

  public async removeByUserId(id: string) {
    return await this.cartRepository.delete({ user_id: id });
  }
}
