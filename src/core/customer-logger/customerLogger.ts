import { Logger } from '@nestjs/common';
import { getLogger } from 'log4js';

export class customerLogger extends Logger {
  error(message: any, stack?: string, context?: string) {
    // add your tailored logic here
    getLogger(context).error(stack, message);
  }
}
