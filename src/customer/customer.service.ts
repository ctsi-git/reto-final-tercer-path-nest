/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { createCustomerDto } from './dto/createCustomer.dto';
import { Customer } from './entities/customer.entity';
import { v4 as uuidv4 } from 'uuid';
import { CustomerDto } from './dto/customer.dto';

@Injectable()
export class CustomerService {
  // Instanciacion del Arreglo de entidades Customer
  private customers: Customer[] = [];

  //Formaters
  transformToDTO = (customer: Customer): CustomerDto => new CustomerDto();
  formatedResponse = (data: CustomerDto | CustomerDto[]) => ({ data });

  // Crea un nuevo cliente y lo agrega al arreglo
  // Recibe la informacion para crear el cliente
  // Devuelve el cliente creado
  create(customerDto: createCustomerDto) {
    try {
      const id = uuidv4();
      const newCustomer = { ...customerDto, uuid: id };
      this.customers.push(newCustomer);
      return this.formatedResponse(newCustomer);
    } catch (err) {
      throw new InternalServerErrorException('Error al crear nuevo cliente');
    }
  }

  // Retorna todos los clientes almacenados
  findAll(): Customer[] | PromiseLike<CustomerDto[]> {
    return this.customers;
  }

  // Devuelve el cliente que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve el cliente encontrado o NotFound excepcion si no existe
  findOne(id: string) {
    try {
      const customer = this.findCustomerByID(id)[0];
      return this.formatedResponse(customer);
    } catch (err) {
      throw new NotFoundException(`No se encuentra cliente con el ID: ${id}`);
    }
  }

  // Actualiza el cliente que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Recibe los nuevos datos del cliente desde el body
  // Devuelve el cliente modificado
  update(id: string, customerDto: createCustomerDto) {
    try {
      const [customer, index] = this.findCustomerByID(id);
      const updatedCustomer = new CustomerDto();
      updatedCustomer.nombre = customerDto.nombre;
      updatedCustomer.apellido = customerDto.apellido;
      updatedCustomer.telefono = customerDto.telefono;
      updatedCustomer.email = customerDto.email;
      updatedCustomer.uuid = id;
      this.customers[index] = updatedCustomer;
      return this.formatedResponse(updatedCustomer);
    } catch (err) {
      throw new InternalServerErrorException('Error al actualizar cliente');
    }
  }

  // Elimina el cliente que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve True si borro el cliente, sino NotFound
  remove(id: string) {
    try {
      const [customer, index] = this.findCustomerByID(id);
      this.customers.splice(index, 1);
      return {
        message: `El cliente con ID: ${customer.uuid} , ha sido borrado!`,
      };
    } catch (err) {
      throw new NotFoundException(`Error, no se encuentra cliente con ese Id`);
    }
  }

  // Busca un customer que coincida con el ID provisto
  // Recibe un ID como parametro a buscar
  // Devuelve el customer encontrado
  private findCustomerByID(id: string): [Customer, number] | never {
    try {
      const index = this.customers.findIndex((c) => c.uuid === id);
      const customer = this.customers[index];
      if (customer === null || customer === undefined) {
        throw new NotFoundException();
      }
      return [customer, index];
    } catch (err) {
      throw new InternalServerErrorException('Error interno del servidor');
    }
  }
}
