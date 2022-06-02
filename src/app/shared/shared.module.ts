import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CacheGlobalModule } from './cache/cache.module';

@Module({
  imports: [AuthModule, CacheGlobalModule],
  controllers: [],
  exports: [],
})
export class SharedModule {}
