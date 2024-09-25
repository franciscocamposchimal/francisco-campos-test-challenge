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

export interface PayerCheckout {
  email: string;
  name?: string;
  surname?: string;
  phone?: CustomerPhone;
}

export interface ItemProduct {
  id: string;
  title: string;
  currency_id: string;
  picture_url?: string;
  description: string;
  category_id?: string;
  quantity: number;
  unit_price: number;
}

export interface CreateCheckoutPreference {
  items: ItemProduct[];
  payer: PayerCheckout;
}
