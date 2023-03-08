import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserPayload } from 'src/auth/models/UserPayload';
import { DuplicatedEmailException } from 'src/exeptions/duplicated-email.exception';
import { ForbiddenException } from 'src/exeptions/forbidden.exception';
import { RecordToDeleteDontExistException } from 'src/exeptions/record-to-delete-dont-exist.exception';
import { z } from 'zod';
import {
  HIGH_PRIVILEGES_APP_ROLES,
  ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION,
  Role,
} from '../entities/role.entity';

export class helpers {
  static checkRolePermission(id: string, userFromJwt: UserPayload) {
    if (
      !HIGH_PRIVILEGES_APP_ROLES.includes(userFromJwt.role) &&
      userFromJwt.id !== id
    )
      throw new ForbiddenException();
  }

  static checkCanCreateWithoutAuth(role: Role, userFromJwt: UserPayload) {
    if (
      !ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION.includes(role) &&
      !HIGH_PRIVILEGES_APP_ROLES.includes(userFromJwt.role)
    )
      throw new ForbiddenException();
  }

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
