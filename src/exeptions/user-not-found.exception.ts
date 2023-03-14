import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super('Record not found', HttpStatus.NOT_FOUND, {
      cause: new Error('Record not found'),
    });
  }
}
