import { Controller, Get } from '@nestjs/common';
import {
  HIGH_PRIVILEGES_APP_ROLES,
  LOW_PRIVILEGES_APP_ROLES,
} from './Constraints/AppRoles';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { RequiredRoles } from './auth/decorators/required-roles.decorator';
import { GeneralUser } from './general_user/entities/general_user.entity';

@Controller()
export class AppController {
  @Get()
  @IsPublic()
  getHello(): { Hello: string } {
    return { Hello: 'World!' };
  }

  @Get('me')
  @RequiredRoles(...LOW_PRIVILEGES_APP_ROLES, ...HIGH_PRIVILEGES_APP_ROLES)
  getMe(@CurrentUser() user: GeneralUser): GeneralUser {
    return user;
  }
}
