import { InvoiceDetailDto } from './invoice-detail.dto';

export class UpdateInvoiceDto {
  uuid?: string;
  dateCreated?: string;
  customerId?: string;
  detail?: InvoiceDetailDto[];
  totalToPay?: number;
  dateUpdated?: string;
}
