import { IS_PUBLIC_KEY } from '$core/decorators/public.decorator';
import { IDecoratorRole } from '$core/decorators/role.decorator';
import User from '$database/entities/user';
import { CustomHttpException } from '$helpers/exception';
import { ErrorCode } from '$types/enums';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { getRepository } from 'typeorm';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> | Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const role = this.reflector.get<IDecoratorRole>('role', context.getHandler());

    if (isPublic || !role) return true;

    const { user } = context.switchToHttp().getRequest();

    return await this.matchRole(role, user);
  }

  async matchRole(roles: IDecoratorRole, user: Express.User) {
    //Dung cache doan nay
    const userRepository = getRepository(User);

    const target = await userRepository.findOne({
      where: { id: user.id },
      select: ['role'],
    });

    const { role, action } = roles;

    if (role !== target.role) {
      throw new CustomHttpException(ErrorCode.Access_Denied);
    }

    return true;
  }
}
