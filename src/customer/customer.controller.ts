import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomerService } from './customer.service';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
} from '../shared/dtos/customer.dto';

@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

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

  @Delete(':id')
  async delete(@Param('id') customerId: string) {
    return await this.customerService.delete(customerId);
  }

  @Post(':id/cards')
  async addCard(
    @Param('id') customerId: string,
    @Body() body: { token: string },
  ) {
    return await this.customerService.createCard(customerId, body.token);
  }

  // Microservices
  @MessagePattern({ cmd: 'get_cutomers' })
  async getCustomers() {
    return await this.customerService.getAll();
  }

  @MessagePattern({ cmd: 'get_customer' })
  async getCustomer(customerId: string) {
    return await this.customerService.getOne(customerId);
  }

  @MessagePattern({ cmd: 'create_customer' })
  async createCustomer(body: CreateCustomerDto) {
    return await this.customerService.create(body);
  }

  @MessagePattern({ cmd: 'update_customer' })
  async updateCustomer(data: { customerId: string; body: UpdateCustomerDto }) {
    return await this.customerService.update(data.customerId, data.body);
  }

  @MessagePattern({ cmd: 'delete_customer' })
  async deleteCustomer(customerId: string) {
    return await this.customerService.delete(customerId);
  }

  @MessagePattern({ cmd: 'create_card' })
  async createCard(data: { customerId: string; token: string }) {
    return await this.customerService.createCard(data.customerId, data.token);
  }
}
