import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
    constructor(message = 'You do not have permission to do this') {
        super(message, HttpStatus.FORBIDDEN, {
            cause: new Error(message),
        });
    }
}
