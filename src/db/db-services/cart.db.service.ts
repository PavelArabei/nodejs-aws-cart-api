import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from '../../cart/entities/cart.entity';
import { Repository } from 'typeorm';
import { CartWithoutId } from '../../cart/models/cart-without-id';

@Injectable()
export class CartDbService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
  ) {}

  public async findAll() {
    console.log('db-log');
    return await this.cartRepository.find();
  }

  public async findOne(id: string) {
    return await this.cartRepository.findOneBy({ id });
  }

  public async create(cart: CartWithoutId): Promise<Cart> {
    return await this.cartRepository.save(cart);
  }

  public async update(cart: Cart) {
    return await this.create(cart);
  }

  public async remove(id: string) {
    return await this.cartRepository.delete(id);
  }
}
