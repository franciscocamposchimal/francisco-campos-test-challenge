import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { MPCustomersService } from './MPCustomers.service';
import { MPPaymentService } from './MPPayments.service';

describe('Mercadopago Module', () => {
  let customerService: MPCustomersService;
  let paymentService: MPPaymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [MPCustomersService, MPPaymentService],
    }).compile();

    customerService = module.get<MPCustomersService>(MPCustomersService);
    paymentService = module.get<MPPaymentService>(MPPaymentService);
  });

  it('customer service should be defined', () => {
    expect(customerService).toBeDefined();
  });

  it('payment service should be defined', () => {
    expect(paymentService).toBeDefined();
  });
});
