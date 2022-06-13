import { Injectable } from '@nestjs/common';
import { Twilio } from 'twilio';
import config from '$config';

@Injectable()
export class SmsService {
  private twilioClient: Twilio;

  constructor() {
    const accountSid = config.SMS.TWILIO_SID;
    const authToken = config.SMS.TWILIO_AUTH_TOKEN;

    this.twilioClient = new Twilio(accountSid, authToken, {
      lazyLoading: true,
    });
  }

  sendSms(phoneNumber: string, message: string) {
    this.twilioClient.messages.create({
      messagingServiceSid: config.SMS.TWILIO_SERVICE_SID,
      to: phoneNumber,
      body: message,
    });

    return true;
  }
}
