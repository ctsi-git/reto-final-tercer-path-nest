/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InvoiceDto } from './dto/invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { v4 as uuidv4 } from 'uuid';
import { InvoiceDetailDto } from './dto/invoice-detail.dto';
import { CreateInvoiceDto } from './dto/createInvoice.dto';
import { UpdateInvoiceDto } from './dto/updateInvoice.dto';

@Injectable()
export class InvoiceService {
  // Instanciacion del Arreglo de entidades Invoice
  private invoices: Invoice[] = [];

  // Formaters
  transformToDTO = (invoice: Invoice): InvoiceDto => new InvoiceDto();
  formatResponse = (data: InvoiceDto | InvoiceDto[]) => ({ data });

  // Crea una nueva factura y la agrega al arreglo
  // Recibe la informacion para crear la factura
  // Devuelve la factura creada
  create(createInvoice: CreateInvoiceDto) {
    try {
      const id = uuidv4();
      const invoiceDetails: Array<InvoiceDetailDto> = [];
      let total = 0;

      // Genera los detalles de la factura
      for (let i = 0; i < createInvoice.detail.length; i++) {
        let newDetail = new InvoiceDetailDto();
        newDetail = createInvoice.detail[i];
        newDetail.toPay = newDetail.quantity * newDetail.price;
        newDetail.dateAdded = new Date(Date.now()).toISOString();
        total += newDetail.toPay;
        invoiceDetails.push(newDetail);
      }

      createInvoice.detail = invoiceDetails;
      const newInvoice = {
        uuid: id,
        ...createInvoice,
        dateCreated: new Date(Date.now()).toISOString(),
        totalToPay: total,
      };

      this.invoices.push(newInvoice);
      return this.formatResponse(newInvoice);
    } catch (err) {
      throw new InternalServerErrorException('Error al crear nueva Factura!');
    }
  }

  // Retorna todos los invoice almacenados
  findAll(): Invoice[] | PromiseLike<InvoiceDto[]> {
    return this.invoices;
  }

  // Devuelve la factura que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve la factura encontrada o excepcion si no existe
  findOne(id: string) {
    try {
      const invoice = this.findInvoiceByID(id)[0];
      return this.formatResponse(invoice);
    } catch (err) {
      throw new NotFoundException(`No se encuentra factura con el ID: ${id}`);
    }
  }

  // Actualiza la factura que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Recibe los nuevos datos para la factura desde el body
  // Devuelve la factura modificada
  update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    try {
      const [invoice, index] = this.findInvoiceByID(id);
      const invoiceDetails: Array<InvoiceDetailDto> = [];
      let total = 0;

      if (
        updateInvoiceDto.detail != null ||
        updateInvoiceDto.detail != undefined
      ) {
        //Genera los detalles de la factura
        updateInvoiceDto.detail.forEach((element) => {
          if (element.dateAdded === '') {
            element.toPay = element.price * element.quantity;
            total += element.toPay;
            element.dateAdded = new Date(Date.now()).toISOString();
          }
          total += element.toPay;
          invoiceDetails.push(element);
        });

        invoice.detail = invoiceDetails;
        invoice.totalToPay = total;
      }

      //verifico que el costumer ID sea correcto
      if (
        updateInvoiceDto.customerId != null ||
        updateInvoiceDto.customerId != undefined
      ) {
        invoice.customerId = updateInvoiceDto.customerId;
      }

      invoice.dateUpdated = new Date(Date.now()).toISOString();

      this.invoices[index] = invoice;
      return this.formatResponse(invoice);
    } catch (err) {
      throw new InternalServerErrorException('Error al actualizar factura');
    }
  }

  // Elimina el invoice que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve True si borro el invoice, sino NotFound
  remove(id: string) {
    try {
      const [invoice, res] = this.findInvoiceByID(id);
      this.invoices.splice(res, 1);
      return {
        message: `La factura con ID: ${invoice.uuid} , ha sido borrada!`,
      };
    } catch (err) {
      throw new NotFoundException(`Error, no se encuentra factura`);
    }
  }

  // Busca un invoice que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve el invoice encontrado
  private findInvoiceByID(id: string): [Invoice, number] | never {
    try {
      const index = this.invoices.findIndex((i) => i.uuid === id);
      const invoice = this.invoices[index];
      if (invoice === null || invoice === undefined) {
        throw new NotFoundException(`No se encuentra factura con el id: ${id}`);
      }
      return [invoice, index];
    } catch (err) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }
}
