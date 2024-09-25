import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MPCustomersService } from './MPCustomers.service';
import { MPPaymentService } from './MPPayments.service';

@Module({
  imports: [ConfigModule],
  providers: [MPCustomersService, MPPaymentService],
  exports: [MPCustomersService, MPPaymentService],
})
export class MercadopagoModule {}
