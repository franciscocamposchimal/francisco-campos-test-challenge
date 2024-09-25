import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersService } from './customersService.service';
import { PaymentService } from './paymentsService.service';

@Module({
  imports: [ConfigModule],
  providers: [CustomersService, PaymentService],
  exports: [CustomersService, PaymentService],
})
export class MercadopagoModule {}
