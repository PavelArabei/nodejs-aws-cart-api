import { IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateCartItemDto {
  @IsUUID()
  product_id: string;

  @IsNotEmpty()
  count: number;

  isNewProduct: boolean;
}
