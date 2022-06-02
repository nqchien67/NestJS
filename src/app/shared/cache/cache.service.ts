import { assignCachePrefix } from '$helpers/until';
import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  private readonly MEMBER_PROFILE = 'MEMBER_PROFILE';
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async clearAllCache() {
    await this.cacheManager.reset();
  }

  createKeyCacheMember(memberId: number | string) {
    return assignCachePrefix(`${this.MEMBER_PROFILE}:${memberId}`);
  }

  async getMemberCache(memberId: number): Promise<string> {
    const keyCache = this.createKeyCacheMember(memberId);
    return await this.cacheManager.get(keyCache);
  }

  // async getMemberInfo(memberId: number, isShowOrigin?: boolean) {
  //   const cacheData = await this.getMemberCache(memberId);

  //   if (cacheData) {
  //     const cacheObject = typeof cacheData === 'string' ? JSON.parse(cacheData) : cacheData;
  //     if (!isShowOrigin) {
  //       this.removeShowOrigin(cacheObject);
  //     }

  //     return cacheObject;
  //   }

  //   const member = await this.getMemberInfoForCache(memberId);

  //   await this.setMemberCache(memberId, member);
  //   if (!isShowOrigin) {
  //     this.removeShowOrigin(member);
  //   }
  //   return member;
  // }
}
