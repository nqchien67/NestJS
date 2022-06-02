import { JwtAuthGuard } from '$app/shared/auth/jwt-auth.guard';
import { CustomParseIntPipe } from '$core/customer-pipe/customer.pipe';
import { Public } from '$core/decorators/public.decorator';
import { Roles } from '$core/decorators/role.decorator';
import { User } from '$core/decorators/user.deorator';
import { CustomHttpException } from '$helpers/exception';
import { validate } from '$helpers/validate';
import { Action, ErrorCode, Role } from '$types/enums';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { registerSchema } from 'class-validator';
import { loginSchema } from './client.schema';
import { ClientService } from './client.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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
  @Post('/register')
  async register(@Body() body: RegisterDto) {
    validate(registerSchema, body);

    return await this.authService.register(body);
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
