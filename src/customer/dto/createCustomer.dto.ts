import { IsEmail } from 'class-validator';
import { CustomerInterface } from '../interfaces/customer.interface';

export class createCustomerDto implements CustomerInterface {
  nombre: string;
  apellido: string;
  telefono: string;
  @IsEmail()
  email: string;
}
