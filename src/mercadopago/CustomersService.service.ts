import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MercadoPagoConfig, Customer } from 'mercadopago';

@Injectable()
export class CustomersService {
  private mercadopago: MercadoPagoConfig;
  private customer: Customer;

  constructor(private readonly configService: ConfigService) {
    const accessToken = this.configService.get<string>(
      'mercadopago.accessToken',
    );
    this.mercadopago = new MercadoPagoConfig({ accessToken });
    this.customer = new Customer(this.mercadopago);
  }

  async getAll() {
    return await this.customer.search();
  }

  async getOne(customerId: string) {
    return await this.customer.get({ customerId });
  }
}
