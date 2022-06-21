import config from '$config';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { dirname } from 'path';
import { MailConsumer } from './mail.consumer';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: config.MAIL.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
          user: config.MAIL.MAIL_USER,
          pass: config.MAIL.MAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" ' + config.MAIL.MAIL_FROM,
      },
      template: {
        dir: dirname(require.main.filename) + '/../email-templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),

    BullModule.registerQueue({
      name: 'mail',
    }),
  ],
  providers: [MailService, MailConsumer],
  exports: [MailService],
})
export class MailModule {}
