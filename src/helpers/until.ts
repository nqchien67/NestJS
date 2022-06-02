import config from '$config';
import { IDecoratorRole } from '$core/decorators/role.decorator';
import User from '$database/entities/user';

export function assignCachePrefix(key: string) {
  return `${config.APP_NAME}:cache:${config.NODE_ENV}:${key}`.split(' ').join('');
}
