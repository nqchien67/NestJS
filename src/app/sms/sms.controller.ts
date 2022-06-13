import { Roles } from '$core/decorators/role.decorator';
import { Role } from '$types/enums';
import { Body, Controller, Post } from '@nestjs/common';
import { SendSmsDto } from './dto/sendSms.dto';
import { SmsService } from './sms.service';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Roles({ role: Role.ADMIN })
  @Post('send-sms')
  sendSms(@Body() body: SendSmsDto) {
    return this.smsService.sendSms(body.phoneNumber, body.message);
  }
}
