import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { SmsConsumer } from './sms.consumer';
import { SmsController } from './sms.controller';
import { SmsService } from './sms.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sms',
    }),
  ],
  providers: [SmsService],
  controllers: [SmsController],
})
export class SmsModule {}
