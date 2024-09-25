import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppConfig, DatabaseConfig, MercadoPagoConfig } from './common/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MercadopagoModule } from './mercadopago/mercadopago.module';
import { CustomerModule } from './customer/customer.module';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig, MercadoPagoConfig],
    }),
    MercadopagoModule,
    CustomerModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
