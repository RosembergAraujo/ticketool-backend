import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('You do not have permission to do this', HttpStatus.FORBIDDEN, {
      cause: new Error('You do not have permission to do this'),
    });
  }
}
