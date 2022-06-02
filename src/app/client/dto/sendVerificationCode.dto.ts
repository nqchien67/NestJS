import { IsEmail, IsString } from 'class-validator';

export class SendVerificationCodeDTO {
  @IsEmail()
  email: string;
}
