import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Solucion al reto final del tercer path de NestJS!';
  }
}
