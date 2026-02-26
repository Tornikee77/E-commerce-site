import { IsNumber } from 'class-validator';

export class CreateSessionRequestDto {
  @IsNumber()
  productId: number;
}
