import { SetMetadata } from '@nestjs/common';
import { AppRoles } from '../../Constraints/AppRoles';

export const REQUIRED_ROLES_METADATA_KEY = 'requiredRoles';
export const RequiredRoles = (...requiredRoles: AppRoles[]) =>
  SetMetadata(REQUIRED_ROLES_METADATA_KEY, requiredRoles);
