import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { RequiredRoles } from './auth/decorators/required-roles.decorator';
import {
  HIGH_PRIVILEGES_APP_ROLES,
  LOW_PRIVILEGES_APP_ROLES,
} from './user/entities/role.entity';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  @Get()
  @IsPublic()
  getHello(): { Hello: string } {
    return { Hello: 'World!' };
  }

  @Get('me')
  // @RequiredRoles(...HIGH_PRIVILEGES_APP_ROLES)
  @RequiredRoles(...HIGH_PRIVILEGES_APP_ROLES, ...LOW_PRIVILEGES_APP_ROLES)
  getMe(@CurrentUser() user: User): User {
    return user;
  }
}
