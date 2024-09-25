import { Body, Controller, Get, Post } from '@nestjs/common';
import { PaymentService } from '../mercadopago/paymentsService.service';
import { CreatePaymentDto } from '../shared/dtos';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentService) {}

  @Get('methods')
  async getPaymentMethods() {
    return await this.paymentsService.getPaymentMethods();
  }

  @Post()
  async createPayment(@Body() body: CreatePaymentDto) {
    return await this.paymentsService.createPayment(body);
  }
}
