import { Cart } from '../entities/cart.entity';

export type CartWithoutId = Omit<Cart, 'id'>;
