import { MercadoPagoConfig, Payment, PaymentMethod } from 'mercadopago';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { CreatePayment } from '../shared/Types';

@Injectable()
export class PaymentService {
  private mercadopago: MercadoPagoConfig;
  private payment: Payment;
  private paymentMethod: PaymentMethod;

  constructor(private readonly configService: ConfigService) {
    const accessToken = this.configService.get<string>(
      'mercadopago.accessToken',
    );

    this.mercadopago = new MercadoPagoConfig({ accessToken });
    this.payment = new Payment(this.mercadopago);
    this.paymentMethod = new PaymentMethod(this.mercadopago);
  }

  async getPaymentMethods() {
    try {
      const response = await this.paymentMethod.get();
      return response;
    } catch (error) {
      if (error?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException(
          'Payment methods not found',
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        'Error fetching payment methods',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createPayment(body: CreatePayment) {
    try {
      const idempotencyKey = this.configService.get<string>(
        'mercadopago.idempotencyKey',
      );
      const response = await this.payment.create({
        body,
        requestOptions: { idempotencyKey },
      });
      return response;
    } catch (error) {
      if (error?.status === HttpStatus.BAD_REQUEST) {
        throw new HttpException('Invalid payment data', HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        'Error creating payment',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
