import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  UseFilters,
  UseGuards,
  ValidationPipe,
  UsePipes,
  Patch,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CustomerService } from './customer.service';
import { createCustomerDto } from './dto/createCustomer.dto';
import { CustomerDto } from './dto/customer.dto';
import { updateCustomerDto } from './dto/updateCustomer.dto';

@Controller('customer')
@UseFilters(new HttpExceptionFilter())
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  // listado de todos los clientes
  @Get()
  async findAll(): Promise<CustomerDto[]> {
    return this.customerService.findAll();
  }

  // busqueda de un cliente por ID
  @Get('/:id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.customerService.findOne(id);
  }

  // creacion de nuevo cliente
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() customerDto: createCustomerDto) {
    return this.customerService.create(customerDto);
  }

  // modificacion de todos los datos del cliente
  @Put('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCustomerDto: createCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  // modificacion de todos los datos del usuario
  @Patch('/:id')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  modify(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateCustomer: updateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomer);
  }

  // eliminacion del cliente que coincida con el ID
  @Delete('/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.customerService.remove(id);
  }
}
