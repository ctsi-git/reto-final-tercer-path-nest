/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseFilters,
  ParseUUIDPipe,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceDto } from './dto/invoice.dto';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
import { UpdateInvoiceDto } from './dto/updateInvoice.dto';

@Controller('invoice')
@UseFilters(new HttpExceptionFilter())
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  // creacion de nueva factura
  @Post()
  @UseGuards(AuthGuard)
  //@UsePipes(new ValidationPipe())
  create(@Body() newInvoice: CreateInvoiceDto) {
    return this.invoiceService.create(newInvoice);
  }

  // listado de todas las facturas almacenadas
  @Get()
  async findAll(): Promise<InvoiceDto[]> {
    return this.invoiceService.findAll();
  }

  // busqueda de una factura por ID
  @Get('/:id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.invoiceService.findOne(id);
  }

  // modificacion de todos los datos de la factura
  @Put('/:id')
  @UseGuards(AuthGuard)
  //@UsePipes(new ValidationPipe())
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateInvoice: UpdateInvoiceDto,
  ) {
    return this.invoiceService.update(id, updateInvoice);
  }
  // modificacion de todos los datos del usuario
  @Patch('/:id')
  @UseGuards(AuthGuard)
  //@UsePipes(new ValidationPipe())
  modify(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateInvoiceDto,
  ) {
    return this.invoiceService.update(id, updateUserDto);
  }

  // eliminacion de la factura que coincida con el ID
  @Delete('/:id')
  @UseGuards(AuthGuard)
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.invoiceService.remove(id);
  }
}
