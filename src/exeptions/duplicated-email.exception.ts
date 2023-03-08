import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicatedEmailException extends HttpException {
  constructor() {
    super('This email already used', HttpStatus.CONFLICT, {
      cause: new Error('This email already used'),
    });
  }
}
