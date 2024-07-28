import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatuses } from '../models';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid', name: 'user_id' })
  user_id: string;

  @Column()
  cart_id: string;

  @Column('json')
  delivery: object;

  @Column('json')
  payment: object;

  @Column({
    type: 'enum',
    enum: OrderStatuses,
    default: OrderStatuses.CREATED,
  })
  status: OrderStatuses;

  @ManyToOne(() => User, (useRealTimers) => useRealTimers.orders, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Cart, (cart) => cart.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
