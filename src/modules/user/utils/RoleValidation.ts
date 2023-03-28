import { HttpException } from '@nestjs/common';
import { UserPayload } from 'src/auth/models/UserPayload';
import { ForbiddenException } from 'src/exeptions/forbidden.exception';
import {
    HIGH_PRIVILEGES_APP_ROLES,
    ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION,
    Role,
} from '../entities/role.entity';

export async function checkRolePermission(
    id: string,
    userFromJwt: UserPayload,
): Promise<void | HttpException> {
    if (
        !HIGH_PRIVILEGES_APP_ROLES.includes(userFromJwt.role as Role) &&
        userFromJwt.id !== id
    )
        throw new ForbiddenException();
}

export async function checkCanCreateWithoutAuth(
    role: Role,
    userFromJwt: UserPayload,
): Promise<void | HttpException> {
    if (
        !ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION.includes(role) &&
        !HIGH_PRIVILEGES_APP_ROLES.includes(userFromJwt.role as Role)
    )
        throw new ForbiddenException();
}
