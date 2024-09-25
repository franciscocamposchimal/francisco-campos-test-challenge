import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CustomersService } from '../mercadopago/customersService.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../shared/Dtos';

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

  @Post()
  async create(@Body() body: CreateCustomerDto) {
    return await this.customerService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') customerId: string,
    @Body() body: UpdateCustomerDto,
  ) {
    return await this.customerService.update(customerId, body);
  }
}
