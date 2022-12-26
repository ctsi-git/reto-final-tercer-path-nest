import { IsInt } from 'class-validator';

export class InvoiceDetailDto {
  @IsInt()
  quantity: number;
  description: string;
  @IsInt()
  price: number;
  toPay: number;
  dateAdded: string;
}
