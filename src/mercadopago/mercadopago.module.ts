import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomersService } from './CustomersService.service';

@Module({
  imports: [ConfigModule],
  providers: [CustomersService],
  exports: [CustomersService],
})
export class MercadopagoModule {}
