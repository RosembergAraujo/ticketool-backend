import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/modules/user/entities/role.entity';

export const REQUIRED_ROLES_METADATA_KEY = 'requiredRoles';
export const RequiredRoles = (...requiredRoles: Role[]) =>
    SetMetadata(REQUIRED_ROLES_METADATA_KEY, requiredRoles);
