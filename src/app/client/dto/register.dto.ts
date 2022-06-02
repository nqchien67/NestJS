import { IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsString()
  password: string;
}
