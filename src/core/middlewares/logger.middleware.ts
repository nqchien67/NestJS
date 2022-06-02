import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { getLogger } from 'log4js';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    getLogger('METHOD').debug(`[ ${req.method} : ${req.baseUrl} ]`);
    next();
  }
}
