import { ClientService } from '$app/client/client.service';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { MailService } from '../mail/mail.service';

@Injectable()
export class TasksService {
  constructor(private readonly mailService: MailService, private readonly clientService: ClientService) {}

  @Cron('0 7 * * 1')
  async sendScheduleEmail() {
    const emails = await this.clientService.findAllEmail();
    emails.forEach((email) => {
      this.mailService.sendMail(email, 'Hello world', 'schedule', { name: email });
    });
  }
}
