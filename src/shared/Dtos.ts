import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import type {
  CreateCustomer,
  CreatePayment,
  CustomerPhone,
  UpdateCustomer,
  Payer,
} from './Types';

class CustomerPhoneDto implements CustomerPhone {
  @IsString()
  @IsNotEmpty()
  area_code: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  number: string;
}

export class CreateCustomerDto implements CreateCustomer {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CustomerPhoneDto)
  phone?: CustomerPhoneDto;

  @IsOptional()
  @IsString()
  default_address?: string;
}

export class UpdateCustomerDto implements UpdateCustomer {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  first_name?: string;

  @IsOptional()
  @IsString()
  last_name?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CustomerPhoneDto)
  phone?: CustomerPhoneDto;

  @IsOptional()
  @IsString()
  default_address?: string;
}

class PayerDto implements Payer {
  @Transform(() => 'customer')
  type: string;

  @IsString()
  @IsNotEmpty()
  id: string;
}

export class CreatePaymentDto implements CreatePayment {
  @IsNotEmpty()
  @IsNumber()
  transaction_amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  payment_method_id: string;

  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsNumber()
  installments: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PayerDto)
  payer: PayerDto;
}
