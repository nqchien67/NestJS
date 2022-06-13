import { IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;
}
