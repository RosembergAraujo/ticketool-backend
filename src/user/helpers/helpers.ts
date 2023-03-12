import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { DuplicatedEmailException } from 'src/exeptions/duplicated-email.exception';
import { RecordToDeleteDontExistException } from 'src/exeptions/record-to-delete-dont-exist.exception';
import { z } from 'zod';

export class helpers {
  static handleExeption(err: any) {
    if (err instanceof z.ZodError) {
      throw new HttpException(err.issues, HttpStatus.BAD_REQUEST, {
        cause: new Error(err.message),
      });
    }
    if (err.constructor.name === PrismaClientKnownRequestError.name) {
      if (err.code === 'P2002') throw new DuplicatedEmailException();
      if (err.code === 'P2025') throw new RecordToDeleteDontExistException();
    }
  }
}
