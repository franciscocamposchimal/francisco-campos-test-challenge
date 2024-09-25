import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { MercadopagoModule } from '../mercadopago/mercadopago.module';

@Module({
  imports: [MercadopagoModule],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
