import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }
    handleRequest(err: any, user: any, info: any, context: any) {
        const isPublic = this.reflector.get<string[]>(
            IS_PUBLIC_KEY,
            context.getHandler(),
        );
        if (user) return user;
        if (isPublic) return true;
        throw new UnauthorizedException();
    }
}
