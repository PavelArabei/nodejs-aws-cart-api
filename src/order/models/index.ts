import { Order } from '../entities/order.entity';

export enum OrderStatuses {
  CREATED = 'CREATED',
  SHIPPED = 'SHIPPED',
}

export type Delivery = {
  firstName: string;
  lastName: string;
  address: string;
  comment: string;
};

export type OrderDto = Pick<Order, 'user_id' | 'cart_id' | 'delivery'>;
