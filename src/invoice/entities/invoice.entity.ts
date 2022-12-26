import { InvoiceDetailDto } from '../dto/invoice-detail.dto';

export class Invoice {
  constructor(
    public uuid: string,
    public customerId: string,
    public detail: InvoiceDetailDto[],
    public totalToPay: number,
    public dateCreated: string,
    public dateUpdated: string,
  ) {}
}
