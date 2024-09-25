import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MPPaymentService } from '../mercadopago/MPPayments.service';
import { CreateCheckoutDto } from '../shared/dtos/payment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly mpPaymentsService: MPPaymentService) {}

  @Get('methods')
  async getPaymentMethods() {
    return await this.mpPaymentsService.getPaymentMethods();
  }

  @Get()
  async getPayments() {
    return await this.mpPaymentsService.getPayments();
  }

  @Post('checkout')
  async createCheckoutPreference(@Body() body: CreateCheckoutDto) {
    return await this.mpPaymentsService.createPreference(body);
  }

  // Microservices
  @MessagePattern({ cmd: 'get_payment_methods' })
  async getPaymentMethodsMicroservice() {
    return await this.mpPaymentsService.getPaymentMethods();
  }

  @MessagePattern({ cmd: 'get_payments' })
  async getPaymentsMicroservice() {
    return await this.mpPaymentsService.getPayments();
  }

  @MessagePattern({ cmd: 'create_checkout_preference' })
  async createCheckoutPreferenceMicroservice(body: CreateCheckoutDto) {
    return await this.mpPaymentsService.createPreference(body);
  }
}
