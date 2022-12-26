import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { logger } from 'src/common/middlewares/logger.middleware';

@Module({
  controllers: [InvoiceController],
  providers: [InvoiceService],
})
export class InvoiceModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(logger).forRoutes(InvoiceController);
  }
}
