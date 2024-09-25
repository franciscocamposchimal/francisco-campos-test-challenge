import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './customer.controller';
import { MercadopagoModule } from '../mercadopago/mercadopago.module';
import { Customer } from '../shared/entities/Customer.entity';
import { CustomerRepository } from '../shared/repositories/Customer.repository';
import { CustomerService } from './customer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Customer]), MercadopagoModule],
  providers: [CustomerService, CustomerRepository],
  controllers: [CustomerController],
})
export class CustomerModule {}
