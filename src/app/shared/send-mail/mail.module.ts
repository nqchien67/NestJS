import config from '$config';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { dirname } from 'path';

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
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
