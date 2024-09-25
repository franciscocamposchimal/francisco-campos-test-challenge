import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import type {
  CreateCheckoutPreference,
  PayerCheckout,
  CustomerPhone,
  ItemProduct,
} from '../Types';

class PhoneDto implements CustomerPhone {
  @IsString()
  @IsNotEmpty()
  area_code: string;

  @IsString()
  @IsNotEmpty()
  number: string;
}

class PayerDto implements PayerCheckout {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  surname: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => PhoneDto)
  phone: PhoneDto;
}

class ItemProductDto implements ItemProduct {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  currency_id: string;

  @IsString()
  @IsOptional()
  picture_url: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  category_id: string;

  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  unit_price: number;
}

export class CreateCheckoutDto implements CreateCheckoutPreference {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ItemProductDto)
  items: ItemProductDto[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => PayerDto)
  payer: PayerDto;
}
