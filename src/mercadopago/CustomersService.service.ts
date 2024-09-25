import { MercadoPagoConfig, Customer } from 'mercadopago';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CreateCustomer, UpdateCustomer } from '../shared/Types';
import type { CustomerSearchResultsPage } from 'mercadopago/dist/clients/customer/search/types';

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
    try {
      const response = await this.customer.search();
      const { api_response, results, paging } =
        response as CustomerSearchResultsPage & {
          api_response: { status: number };
        };
      if (api_response.status === HttpStatus.OK) return { results, paging };
      return null;
    } catch (error) {
      if (error?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Customers not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Error fetching customers',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOne(customerId: string) {
    try {
      const response = await this.customer.get({ customerId });
      const { api_response, ...customer } = response;
      if (api_response.status === HttpStatus.OK) return customer;
      return null;
    } catch (error) {
      if (error?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Error fetching customer',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async create(body: CreateCustomer) {
    try {
      const response = await this.customer.create({ body });
      const { api_response, ...customer } = response;
      if (api_response.status === HttpStatus.CREATED) return customer;
      return null;
    } catch (error) {
      if (error?.status === HttpStatus.BAD_REQUEST) {
        throw new HttpException(
          'Invalid customer data',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Error creating customer',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async update(customerId: string, body: UpdateCustomer) {
    try {
      const response = await this.customer.update({ customerId, body });
      const { api_response, ...customer } = response;
      if (api_response.status === HttpStatus.OK) return customer;
      return null;
    } catch (error) {
      if (error?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      } else if (error?.status === HttpStatus.BAD_REQUEST) {
        throw new HttpException(
          'Invalid customer data',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          'Error updating customer',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
