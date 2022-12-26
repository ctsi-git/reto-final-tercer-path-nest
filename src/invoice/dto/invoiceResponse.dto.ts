import { APIResponse } from '../../common/interfaces/ApiResponse';
import { InvoiceDto } from './invoice.dto';

export interface invoiceResponse extends APIResponse {
  data?: InvoiceDto | InvoiceDto[];
}
