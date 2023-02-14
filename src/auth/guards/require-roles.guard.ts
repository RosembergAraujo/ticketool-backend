import { CanActivate, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { REQUIRED_ROLES_METADATA_KEY } from '../decorators/required-roles.decorator';
import { AppRoles } from '../../Constraints/AppRoles';

@Injectable()
export class RequireRolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: any): boolean {
    const user = context.switchToHttp().getRequest().user;
    const requiredRoles = this.reflector.getAllAndOverride(
      REQUIRED_ROLES_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );
    const thisRoleHasPermission = requiredRoles?.includes(
      Number(AppRoles[user.role]),
    );
    return !!(!requiredRoles || thisRoleHasPermission);
  }
}
