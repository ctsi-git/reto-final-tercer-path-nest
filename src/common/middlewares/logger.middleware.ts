import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      req.method === 'POST' ||
      req.method === 'PUT' ||
      req.method === 'PATCH'
    ) {
      console.log(req.body);
    }

    next();
  }
}
