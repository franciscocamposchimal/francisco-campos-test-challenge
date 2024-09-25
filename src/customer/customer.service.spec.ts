import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MercadopagoModule } from '../mercadopago/mercadopago.module';
import { CustomerRepository } from '../shared/repositories/Customer.repository';
import { Customer } from '../shared/entities/Customer.entity';
import { CustomerService } from './customer.service';

describe('CustomerService', () => {
  let service: CustomerService;

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
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
