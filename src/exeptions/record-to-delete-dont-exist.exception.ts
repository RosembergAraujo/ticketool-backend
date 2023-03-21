import { HttpException, HttpStatus } from '@nestjs/common';

export class RecordToDeleteDontExistException extends HttpException {
    constructor() {
        super('Record to delete does not exist', HttpStatus.NOT_FOUND, {
            cause: new Error('Record to delete does not exist'),
        });
    }
}
