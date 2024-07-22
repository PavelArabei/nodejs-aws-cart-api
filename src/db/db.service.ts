import { CartDbService } from './db-services/cart.db.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  constructor(private readonly cartDbService: CartDbService) {}

  get cart() {
    return this.cartDbService;
  }
}
