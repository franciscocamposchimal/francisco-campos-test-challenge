import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { MercadopagoModule } from '../mercadopago/mercadopago.module';

@Module({
  imports: [MercadopagoModule],
  controllers: [CustomerController],
})
export class CustomerModule {}
