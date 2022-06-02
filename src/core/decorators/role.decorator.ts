import { Action, Role } from '$types/enums';
import { SetMetadata } from '@nestjs/common';

export interface IDecoratorRole {
  role: Role;
  action?: Action[];
}

export const Roles = (role: IDecoratorRole) => SetMetadata('role', role);
