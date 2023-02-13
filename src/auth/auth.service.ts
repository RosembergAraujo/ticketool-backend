import { Injectable } from '@nestjs/common';
import { GeneralUserService } from '../general_user/general_user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { GeneralUser } from '../general_user/entities/general_user.entity';
import { UserPayload } from './models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: GeneralUserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<GeneralUser> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user?.password))) {
      return {
        ...user,
        password: undefined,
        // foo: 'bar', // I can modify the return of "user" after Guards validates here
      };
    }
    throw new UnauthorizedError('Email address or password is incorrect');
  }

  login(user: GeneralUser): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
    };
  }
}
