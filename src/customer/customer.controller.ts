import { Controller, Get, Param } from '@nestjs/common';
import { CustomersService } from '../mercadopago/CustomersService.service';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomersService) {}

  @Get()
  async getAll() {
    return await this.customerService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') customerId: string) {
    return await this.customerService.getOne(customerId);
  }
}
