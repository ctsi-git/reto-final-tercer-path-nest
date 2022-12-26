import { InvoiceDetailDto } from './invoice-detail.dto';

export class CreateInvoiceDto {
  dateCreated: string;
  customerId: string;
  detail: InvoiceDetailDto[];
  dateUpdated: string;
}
