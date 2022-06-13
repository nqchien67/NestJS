import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { MailModule } from '../mail/mail.module';
import { ClientModule } from '$app/client/client.module';

@Module({
  imports: [MailModule, ClientModule],
  providers: [TasksService],
})
export class TasksModule {}
