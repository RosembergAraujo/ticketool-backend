import { Injectable } from '@nestjs/common';
import { GeneralUserService } from '../general_user/general_user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { GeneralUser } from '../general_user/entities/general_user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: GeneralUserService) {}

  login() {
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async validateUser(email: string, password: string): Promise<GeneralUser> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user?.password))) {
      return {
        ...user,
        password: undefined,
      };
    }
    throw new UnauthorizedError('Email address or password is incorrect');
  }
}
