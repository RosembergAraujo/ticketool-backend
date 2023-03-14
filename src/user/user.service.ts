import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserPayload } from 'src/auth/models/UserPayload';
import { DuplicatedEmailException } from 'src/exeptions/duplicated-email.exception';
import { NotFoundException } from 'src/exeptions/user-not-found.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, createUserDtoSchema } from './dtos/create-user.dto';
import { responseUser } from './dtos/response-user.dto';
import { UpdateUserDto, updateUserDtoSchema } from './dtos/update-user.dto';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import { helpers } from './helpers/helpers';
import {
  checkCanCreateWithoutAuth,
  checkRolePermission,
} from './utils/RoleValidation';
import { createPasswordHashed } from './utils/password';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createUserDto: CreateUserDto,
    userPayload: UserPayload,
  ): Promise<responseUser> {
    try {
      const data: CreateUserDto = createUserDtoSchema.parse({
        ...createUserDto,
        role: createUserDto.role || Role.USER,
      });
      data.password = await createPasswordHashed(data.password);
      checkCanCreateWithoutAuth(data.role as Role, userPayload);
      const createdUser: User = await this.prismaService.user.create({ data });
      return {
        ...createdUser,
        password: undefined,
        role: undefined,
      };
    } catch (err: any) {
      helpers.handleExeption(err);
      const errorStatus: any = err?.status
        ? err.status
        : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          status: errorStatus,
          error: err.message,
        },
        errorStatus,
        {
          cause: err,
        },
      );
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  // findByEmail(email: string, userFromJwt: UserPayload = undefined) { //TESTAR DEPOIS COM TOKEN
  //   const userFromDatabase: any = this.prismaService.user.findUnique({
  //     where: { email },
  //   });
  //   if (userFromJwt)
  //     this.checkRolePermission(userFromDatabase?.id, userFromJwt);
  //   return userFromDatabase;
  // }

  async findById(
    id: string,
    userFromJwt: UserPayload,
  ): Promise<responseUser | null> {
    checkRolePermission(id, userFromJwt);
    const userFound: User | null = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (userFound)
      return {
        ...userFound,
        password: undefined,
      };
    throw new NotFoundException();
  }

  async update(
    id: string,
    userFromReq: UpdateUserDto,
    userFromJwt: UserPayload,
  ): Promise<responseUser> {
    try {
      checkRolePermission(id, userFromJwt);
      const userFromDatabase: User | null =
        await this.prismaService.user.findUnique({
          where: { id },
        });
      if (userFromDatabase) {
        const data: UpdateUserDto = updateUserDtoSchema.parse({
          ...userFromDatabase,
          ...userFromReq,
        });
        if (
          userFromReq?.email &&
          userFromReq.email !== userFromDatabase.email
        ) {
          const userFoundByEmail: User | null =
            await this.prismaService.user.findUnique({
              where: { email: userFromReq.email },
            });
          if (userFoundByEmail) throw new DuplicatedEmailException();
        }
        if (userFromReq.password)
          data.password = await createPasswordHashed(userFromReq.password);
        const updatedUser: User = await this.prismaService.user.update({
          where: { id },
          data,
        });
        return {
          ...updatedUser,
          password: undefined,
          role: undefined,
        };
      }
      throw new NotFoundException();
    } catch (err: any) {
      helpers.handleExeption(err);
      const errorStatus: any = err?.status
        ? err.status
        : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          status: errorStatus,
          error: err.message,
        },
        errorStatus,
        {
          cause: err,
        },
      );
    }
  }

  async remove(id: string, userFromJwt: UserPayload): Promise<void> {
    checkRolePermission(id, userFromJwt);
    try {
      await this.prismaService.user.delete({
        where: { id },
      });
      return;
    } catch (err: any) {
      helpers.handleExeption(err);
      console.log(err);
      const errorStatus: any = err?.status
        ? err.status
        : HttpStatus.INTERNAL_SERVER_ERROR;
      throw new HttpException(
        {
          status: errorStatus,
          error: err.message,
        },
        errorStatus,
        {
          cause: err,
        },
      );
    }
  }
}
