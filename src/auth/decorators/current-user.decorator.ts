import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthRequest } from '../models/AuthRequest';
import { GeneralUser } from '../../general_user/entities/general_user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): GeneralUser => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
