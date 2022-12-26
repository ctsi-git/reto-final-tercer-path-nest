import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { InvoiceController } from 'src/invoice/invoice.controller';
import { logger } from 'src/common/middlewares/logger.middleware';

@Module({
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(InvoiceController);
  }
}
