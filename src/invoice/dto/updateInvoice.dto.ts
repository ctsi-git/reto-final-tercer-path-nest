import { IsInt } from 'class-validator';
import { InvoiceDetailDto } from './invoice-detail.dto';

export class UpdateInvoiceDto {
  uuid?: string;
  dateCreated?: string;
  customerId?: string;
  detail?: InvoiceDetailDto[];
  @IsInt()
  totalToPay?: number;
  dateUpdated?: string;
}
