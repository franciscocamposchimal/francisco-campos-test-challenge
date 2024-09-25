import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from '../entities/Customer.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  exists(email: string): Promise<boolean> {
    return this.repository.exists({ where: { email } });
  }

  findByCustomerId(customerId: string): Promise<Customer | null> {
    return this.repository.findOne({ where: { customerId } });
  }

  save(customer: Partial<Customer>): Promise<Customer> {
    return this.repository.save(customer);
  }

  async update(
    customerId: string,
    customer: Partial<Customer>,
  ): Promise<Customer | null> {
    const updateResult = await this.repository
      .createQueryBuilder()
      .update()
      .set(customer)
      .where('customerId = :customerId', { customerId })
      .returning('*')
      .execute();
    return updateResult.raw[0];
  }

  async delete(customerId: string): Promise<void> {
    await this.repository.delete({ customerId });
  }
}
