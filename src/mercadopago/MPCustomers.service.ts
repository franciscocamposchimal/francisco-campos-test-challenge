import { MercadoPagoConfig, Customer, CustomerCard } from 'mercadopago';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CustomerSearchResultsPage } from 'mercadopago/dist/clients/customer/search/types';
import type { CreateCustomer, UpdateCustomer } from '../shared/Types';

@Injectable()
export class MPCustomersService {
  private mercadopago: MercadoPagoConfig;
  private customer: Customer;
  private card: CustomerCard;

  constructor(private readonly configService: ConfigService) {
    const accessToken = this.configService.get<string>(
      'mercadopago.accessToken',
    );
    this.mercadopago = new MercadoPagoConfig({ accessToken });
    this.customer = new Customer(this.mercadopago);
    this.card = new CustomerCard(this.mercadopago);
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

  async delete(customerId: string) {
    try {
      await this.customer.remove({ customerId });
    } catch (error) {
      if (error?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException(
          'Error deleting customer',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async createCard(customerId: string, token: string) {
    try {
      const response = await this.card.create({ customerId, body: { token } });
      const { api_response, ...card } = response;
      if (api_response.status === HttpStatus.CREATED) return card;
      return null;
    } catch (error) {
      if (error?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
      } else if (error?.status === HttpStatus.BAD_REQUEST) {
        throw new HttpException('Invalid card data', HttpStatus.BAD_REQUEST);
      } else {
        throw new HttpException(
          'Error creating card',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
