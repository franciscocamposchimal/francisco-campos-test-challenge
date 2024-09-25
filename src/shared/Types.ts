interface BaseCustomer {
  first_name?: string;
  last_name?: string;
  phone?: CustomerPhone;
  default_address?: string;
}

export interface CustomerPhone {
  area_code: string;
  number: string;
}

export interface CreateCustomer extends BaseCustomer {
  email: string;
}

export interface UpdateCustomer extends BaseCustomer {
  email?: string;
}

export interface Payer {
  type: string;
  id: string;
}

export interface CreatePayment {
  transaction_amount: number;
  description: string;
  payment_method_id: string;
  token: string;
  installments: number;
  payer: Payer;
}
