import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import type { CreateCustomer, CustomerPhone, UpdateCustomer } from '../Types';

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
