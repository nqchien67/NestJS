import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class SmsService {
  constructor(@InjectQueue('sms') private smsQueue: Queue) {}

  sendSms(phoneNumber: string, message: string) {
    this.smsQueue.add({ phoneNumber, message });
  }
}
