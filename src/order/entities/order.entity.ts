import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrderStatuses } from '../models';
import { User } from '../../users/entities/user.entity';
import { Cart } from '../../cart/entities/cart.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ unique: true })
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
  user: User;

  @OneToOne(() => Cart, (cart) => cart.order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'cart_id' })
  cart: Cart;
}
