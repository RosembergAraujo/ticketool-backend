import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
    constructor(message = 'Record not found') {
        super(message, HttpStatus.NOT_FOUND, {
            cause: new Error(message),
        });
    }
}
