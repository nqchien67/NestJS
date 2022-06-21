import config from '$config';
import { CustomHttpException } from '$helpers/exception';
import { ErrorCode } from '$types/enums';
import { OnQueueCompleted, OnQueueFailed, Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { Twilio } from 'twilio';

@Processor('sms')
export class SmsConsumer {
  private twilioClient: Twilio;

  constructor() {
    const accountSid = config.SMS.TWILIO_SID;
    const authToken = config.SMS.TWILIO_AUTH_TOKEN;

    this.twilioClient = new Twilio(accountSid, authToken, {
      lazyLoading: true,
    });
  }

  @Process()
  sendSms(job: Job<{ phoneNumber: string; message: string }>) {
    const { phoneNumber, message } = job.data;
    this.twilioClient.messages.create({
      messagingServiceSid: config.SMS.TWILIO_SERVICE_SID,
      to: phoneNumber,
      body: message,
    });
  }

  @OnQueueFailed()
  onFailed(job: Job<any>, error: any) {
    throw new CustomHttpException(ErrorCode.Unknown_Error, `Failed job ${job.id}`);
  }
}
