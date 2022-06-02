import config from '$config';
import { CacheModule, Global, Module } from '@nestjs/common';
import { CacheController } from './cache.controller';
import { CacheService } from './cache.service';
import * as IORedisStore from 'cache-manager-ioredis';

@Global()
@Module({
  imports: [
    CacheModule.register({
      store: IORedisStore,
      host: config.REDIS.HOST,
      port: config.REDIS.PORT,
      db: config.REDIS.CACHE_DB,
      password: config.REDIS.PASSWORD,
      ttl: config.CACHE_EXPIRED,
    }),
  ],
  controllers: [CacheController],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheGlobalModule {}
