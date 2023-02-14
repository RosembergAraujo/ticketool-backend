import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { GeneralUser } from './general_user/entities/general_user.entity';
import { IsPublic } from './auth/decorators/is-public.decorator';
import {
  HIGH_PRIVILEGES_APP_ROLES,
  LOW_PRIVILEGES_APP_ROLES,
} from './Constraints/AppRoles';
import { RequiredRoles } from './auth/decorators/required-roles.decorator';

@Controller()
export class AppController {
  @Get()
  @IsPublic()
  getHello(): { Hello: string } {
    return { Hello: 'World!' };
  }

  @Get('me')
  @RequiredRoles(...HIGH_PRIVILEGES_APP_ROLES, ...LOW_PRIVILEGES_APP_ROLES)
  getMe(@CurrentUser() user: GeneralUser): GeneralUser {
    return user;
  }
}
