require('dotenv').config();
import 'module-alias/register';
import './helpers/logger';
import { AppModule } from '$app/app.module';
import config from '$config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { customerLogger } from '$core/customer-logger/customerLogger';
import { NestApplication, NestFactory } from '@nestjs/core';
import { json } from 'express';
import * as helmet from 'helmet';
import { getLogger } from 'log4js';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  app.useLogger(new customerLogger());

  app.use(helmet());
  app.use(json({ limit: '10mb' }));

  // app.useGlobalPipes(new CustomerValidationPipe());

  await app.listen(config.SERVER_PORT);
  getLogger().info(`Server is running on port ${config.SERVER_PORT}`);
})();
