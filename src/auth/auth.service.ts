import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { responseCreatedUserDto } from 'src/user/dto/response-created-user.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UnauthorizedError } from './errors/unauthorized.error';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<responseCreatedUserDto> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user?.password))) {
      return {
        ...user,
      };
    }
    throw new UnauthorizedError('Email address or password is incorrect');
  }

  login(user: User): UserToken {
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      cpfCnpj: user.cpfCnpj,
      name: user.name,
      role: user.role,
    };
    const jwtToken = this.jwtService.sign(payload);
    return {
      access_token: jwtToken,
    };
  }
}
