import { IsPhoneNumber, IsString } from 'class-validator';

export class SendSmsDto {
  @IsPhoneNumber('VI')
  phoneNumber: string;

  @IsString()
  message: string;
}
