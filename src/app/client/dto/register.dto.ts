import { IsEmail, IsNumber, IsNumberString, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsString()
  password: string;
}
