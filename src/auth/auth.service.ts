import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login() {
    return 'Foo';
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  validateUser(email: string, password: string) {}
}
