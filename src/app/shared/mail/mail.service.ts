import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mail') private mailQueue: Queue) {}

  sendMail(receiverMail: string, subject: string, template: string, context: object) {
    this.mailQueue.add({ receiverMail, subject, template, context });
  }
}
