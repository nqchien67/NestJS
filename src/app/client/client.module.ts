import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { AuthController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from '$database/entities/user';
import { AuthModule } from '$app/shared/auth/auth.module';

const repositories = [User];
@Module({
  imports: [TypeOrmModule.forFeature(repositories), AuthModule],
  controllers: [AuthController],
  providers: [ClientService],
})
export class ClientModule {}
