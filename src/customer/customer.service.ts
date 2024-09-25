import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MPCustomersService } from '../mercadopago/MPCustomers.service';
import { CustomerRepository } from '../shared/repositories/Customer.repository';
import type { CreateCustomer, UpdateCustomer } from '../shared/Types';

@Injectable()
export class CustomerService {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly mpCustomersService: MPCustomersService,
  ) {}

  async create(body: CreateCustomer) {
    const exists = await this.customerRepository.exists(body.email);
    if (exists) {
      throw new HttpException('Customer already exists', HttpStatus.CONFLICT);
    }
    const customer = await this.mpCustomersService.create(body);

    try {
      await this.customerRepository.save({
        customerId: customer.id,
        email: body.email,
        ...(body?.first_name && { firstName: body.first_name }),
        ...(body?.last_name && { lastName: body.last_name }),
      });
    } catch (error) {
      await this.mpCustomersService.delete(customer.id);
      if (error?.status) {
        throw new HttpException(error?.message, error.status);
      } else {
        throw new HttpException(
          'Error creating customer',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return customer;
  }

  async getAll() {
    return this.mpCustomersService.getAll();
  }

  async getOne(customerId: string) {
    return this.mpCustomersService.getOne(customerId);
  }

  async update(customerId: string, body: UpdateCustomer) {
    const customer = await this.customerRepository.findByCustomerId(customerId);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    const updatedCustomer = await this.mpCustomersService.update(
      customerId,
      body,
    );

    try {
      await this.customerRepository.update(customerId, {
        ...(body?.first_name && { firstName: body.first_name }),
        ...(body?.last_name && { lastName: body.last_name }),
      });
    } catch (error) {
      if (error?.status) {
        throw new HttpException(error?.message, error.status);
      } else {
        throw new HttpException(
          'Error updating customer',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    return updatedCustomer;
  }

  async delete(customerId: string) {
    try {
      await this.customerRepository.delete(customerId);
      await this.mpCustomersService.delete(customerId);
      return { message: 'Customer deleted' };
    } catch (error) {
      if (error?.status) {
        throw new HttpException(error?.message, error.status);
      } else {
        throw new HttpException(
          'Error deleting customer',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async createCard(customerId: string, token: string) {
    const customer = await this.customerRepository.findByCustomerId(customerId);
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    return await this.mpCustomersService.createCard(customerId, token);
  }
}
