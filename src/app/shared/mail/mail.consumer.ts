import { CustomHttpException } from '$helpers/exception';
import { ErrorCode } from '$types/enums';
import { MailerService } from '@nestjs-modules/mailer';
import { OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('mail')
export class MailConsumer {
  constructor(private readonly mailerService: MailerService) {}

  @Process()
  sendMail(job: Job<{ receiverMail: string; subject: string; template: string; context: object }>) {
    const { receiverMail, subject, template, context } = job.data;
    this.mailerService.sendMail({
      to: receiverMail,
      subject,
      template,
      context,
    });
  }

  @OnQueueFailed()
  onFailed(job: Job<any>, error: any) {
    throw new CustomHttpException(ErrorCode.Unknown_Error, `Failed job ${job.id}`);
  }
}
