import {
  MercadoPagoConfig,
  Payment,
  PaymentMethod,
  Preference,
} from 'mercadopago';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { PaymentSearch } from 'mercadopago/dist/clients/payment/search/types';
import type { CreateCheckoutPreference } from '../shared/Types';

@Injectable()
export class MPPaymentService {
  private mercadopago: MercadoPagoConfig;
  private payment: Payment;
  private paymentMethod: PaymentMethod;
  private preference: Preference;

  constructor(private readonly configService: ConfigService) {
    const accessToken = this.configService.get<string>(
      'mercadopago.accessToken',
    );
    this.mercadopago = new MercadoPagoConfig({ accessToken });
    this.payment = new Payment(this.mercadopago);
    this.paymentMethod = new PaymentMethod(this.mercadopago);
    this.preference = new Preference(this.mercadopago);
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

  async getPayments() {
    try {
      const response = await this.payment.search();
      const { api_response, results, paging } = response as PaymentSearch & {
        api_response: { status: number };
      };

      if (api_response.status === HttpStatus.OK) return { results, paging };
      return null;
    } catch (error) {
      if (error?.status === HttpStatus.NOT_FOUND) {
        throw new HttpException('Payments not found', HttpStatus.NOT_FOUND);
      }

      throw new HttpException(
        'Error fetching payments',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createPreference(checkoutData: CreateCheckoutPreference) {
    try {
      const response = await this.preference.create({
        body: {
          ...checkoutData,
          back_urls: {
            success: 'https://www.success.com',
            failure: 'https://www.failure.com',
            pending: 'https://www.pending.com',
          },
          auto_return: 'approved',
          payment_methods: {
            excluded_payment_methods: [
              {
                id: 'master',
              },
            ],
            excluded_payment_types: [
              {
                id: 'ticket',
              },
            ],
            installments: 1,
          },
          notification_url: 'https://www.asdeporte.com/ipn',
          statement_descriptor: 'AsDeporte',
          external_reference: 'Reference_1234',
          expires: true,
        },
      });

      const { api_response, ...preference } = response;
      if (api_response.status === HttpStatus.CREATED) return preference;
      return null;
    } catch (error) {
      if (error?.status === HttpStatus.BAD_REQUEST) {
        throw new HttpException(
          'Invalid preference data',
          HttpStatus.BAD_REQUEST,
        );
      }

      throw new HttpException(
        'Error creating preference',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
