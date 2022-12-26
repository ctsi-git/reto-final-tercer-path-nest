import { Module } from '@nestjs/common';
import { AppController } from './main/app.controller';
import { AppService } from './main/app.service';
import { CustomerModule } from './customer/customer.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [CustomerModule, InvoiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
