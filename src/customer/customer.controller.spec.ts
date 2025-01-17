import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MercadopagoModule } from '../mercadopago/mercadopago.module';
import { CustomerRepository } from '../shared/repositories/Customer.repository';
import { Customer } from '../shared/entities/Customer.entity';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';

describe('CustomerController', () => {
  let controller: CustomerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: getRepositoryToken(Customer),
          useValue: {}, // Mock del repositorio
        },
        {
          provide: CustomerRepository,
          useValue: {}, // Mock del repositorio
        },
      ],
      imports: [MercadopagoModule],
      controllers: [CustomerController],
    }).compile();

    controller = module.get<CustomerController>(CustomerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
