import { CartItem } from '../../cart/models';

export enum OrderStatuses {
  CREATED = 'CREATED',
  SHIPPED = 'SHIPPED',
}

export type Order = {
  id?: string;
  userId: string;
  cartId: string;
  items: CartItem[];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: OrderStatuses;
  total: number;
};
