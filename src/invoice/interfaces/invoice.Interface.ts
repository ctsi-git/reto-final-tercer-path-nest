import { InvoiceDetailDto } from '../dto/invoice-detail.dto';

export interface InvoiceInterface {
  uuid?: string;
  dateCreated?: string;
  customerId?: string;
  detail?: InvoiceDetailDto[];
  total?: number;
  dateUpdated?: string;
}
