import { ForbiddenException } from '@nestjs/common';
import { UserPayload } from 'src/auth/models/UserPayload';
import {
  HIGH_PRIVILEGES_APP_ROLES,
  ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION,
  Role,
} from '../entities/role.entity';

export function checkRolePermission(
  id: string,
  userFromJwt: UserPayload,
): void {
  if (
    !HIGH_PRIVILEGES_APP_ROLES.includes(userFromJwt.role as Role) &&
    userFromJwt.id !== id
  )
    throw new ForbiddenException();
}

export function checkCanCreateWithoutAuth(
  role: Role,
  userFromJwt: UserPayload,
): void {
  if (
    !ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION.includes(role) &&
    !HIGH_PRIVILEGES_APP_ROLES.includes(userFromJwt.role as Role)
  )
    throw new ForbiddenException();
}
