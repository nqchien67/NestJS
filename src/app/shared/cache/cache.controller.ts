import { Roles } from '$core/decorators/role.decorator';
import { Role } from '$types/enums';
import { Controller, Get } from '@nestjs/common';
import { CacheService } from './cache.service';

@Controller('cache')
export class CacheController {
  constructor(private readonly globalCacheService: CacheService) {}

  @Get('clear-all')
  // @Roles({ role: Role.ADMIN })
  async clearCache() {
    // TODO cai nay se clear het db
    return this.globalCacheService.clearAllCache();
  }
}
