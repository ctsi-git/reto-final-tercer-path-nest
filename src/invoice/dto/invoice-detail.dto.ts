import { IsInt } from 'class-validator';

export class InvoiceDetailDto {
  @IsInt()
  quantity: number;
  description: string;
  @IsInt()
  price: number;
  @IsInt()
  toPay: number;
  dateAdded: string;
}
