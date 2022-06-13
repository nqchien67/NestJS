import { Module } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';

@Module({
  providers: [SmsService],
  controllers: [SmsController],
})
export class SmsModule {}
