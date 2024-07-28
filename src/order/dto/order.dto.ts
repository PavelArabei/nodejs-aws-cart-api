import { IsNotEmpty } from 'class-validator';
import { Delivery } from '../models';

export class OrderInputDto {
  @IsNotEmpty()
  delivery: Delivery;
}
