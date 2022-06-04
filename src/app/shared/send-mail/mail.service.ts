import User from '$database/entities/user';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendVerificationCode(email, confirmCode: string) {
    await this.mailerService.sendMail({
      to: email,
      subject: 'Confirm your account.',
      template: 'confirmation',
      context: {
        name: email,
        confirmCode,
      },
    });
  }
}
