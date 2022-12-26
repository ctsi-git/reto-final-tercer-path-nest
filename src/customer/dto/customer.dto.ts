import { IsEmail } from 'class-validator';
import { CustomerInterface } from '../interfaces/customer.interface';

export class CustomerDto implements CustomerInterface {
  uuid: string;
  nombre: string;
  apellido: string;
  telefono: string;
  @IsEmail()
  email: string;
}
