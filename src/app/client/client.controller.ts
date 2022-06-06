import { CustomParseIntPipe } from '$core/customer-pipe/customer.pipe';
import { Public } from '$core/decorators/public.decorator';
import { User } from '$core/decorators/user.deorator';
import { validate } from '$helpers/validate';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { loginSchema } from './client.schema';
import { ClientService } from './client.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { VerifyEmailDto } from './dto/verifyEmail.dto';

@Controller('client')
export class AuthController {
  constructor(private readonly authService: ClientService) {}

  @Get('test/:id')
  // @Roles({ role: Role.USER, action: [Action.CREATE] })
  test(@Param('id', new CustomParseIntPipe()) id: number, @User('userType') userType: Express.User) {
    // throw new CustomHttpException(ErrorCode.Not_Found);
    return userType;
  }

  @Public()
  @Post('/login')
  async login(@Body() body: LoginDto) {
    validate(loginSchema, body);

    return await this.authService.login(body);
  }

  @Public()
  @Post('/verify-email')
  async verifyEmail(@Body() body: VerifyEmailDto) {
    // validate(registerSchema, body);
    return await this.authService.verifyEmail(body);
  }

  @Public()
  @Post('/register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
