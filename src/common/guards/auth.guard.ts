import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers.authorization
      .replace('Bearer', '')
      .replace(' ', '');
    const token =
      '99e4c497d8b4c049ce41e71ff04055adc01714bccdf2f901e4c1d16ffabcef571398fa2b416ddc1037a98c4040c2f277c1bbb2dbc647ed65a2acaf657ac229ec';
    return authToken === token ? true : false;
  }
}
