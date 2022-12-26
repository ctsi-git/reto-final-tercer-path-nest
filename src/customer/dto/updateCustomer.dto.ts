import { IsEmail } from 'class-validator';
import { CustomerInterface } from '../interfaces/customer.interface';

export class updateCustomerDto implements CustomerInterface {
  uuid: string;
  nombre: string;
  apellido: string;
  telefono: string;
  @IsEmail()
  email: string;
}
