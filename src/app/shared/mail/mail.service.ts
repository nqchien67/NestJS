import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  sendMail(receiverMail: string, subject: string, template: string, context: object) {
    this.mailerService.sendMail({
      to: receiverMail,
      subject,
      template,
      context,
    });
  }
}
