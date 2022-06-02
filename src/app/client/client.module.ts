import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { AuthController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '$database/entities/user';
import { AuthModule } from '$app/shared/auth/auth.module';
import { MailModule } from '$app/shared/send-mail/mail.module';

const repositories = [User];
@Module({
  imports: [TypeOrmModule.forFeature(repositories), AuthModule, MailModule],
  controllers: [AuthController],
  providers: [ClientService],
})
export class ClientModule {}
