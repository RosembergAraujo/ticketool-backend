import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserPayload } from 'src/auth/models/UserPayload';
import { SALT_ROUNDS } from 'src/constants/app.constants';
import { DuplicatedEmailException } from 'src/exeptions/duplicated-email.exception';
import { UserNotFoundException } from 'src/exeptions/user-not-found.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, createUserDtoSchema } from './dto/create-user.dto';
import { responseUser } from './dto/response-user.dto';
import { UpdateUserDto, updateUserDtoSchema } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { helpers } from './helpers/helpers';

// import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto, userPayload: UserPayload) {
    try {
      const data: CreateUserDto = createUserDtoSchema.parse({
        ...createUserDto,
        role: createUserDto.role || Role.USER,
      });
      data.password = await bcrypt.hash(data.password, SALT_ROUNDS);
      helpers.checkCanCreateWithoutAuth(data.role, userPayload);
      const createdUser: User = await this.prismaService.user.create({ data });
      return {
        ...createdUser,
        password: undefined,
        role: undefined,
      };
    } catch (err: any) {
      helpers.handleExeption(err);
      const errorStatus = err?.status
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
    helpers.checkRolePermission(id, userFromJwt);
    const userFound: User | null = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (userFound)
      return {
        ...userFound,
        password: undefined,
      };
    throw new UserNotFoundException();
  }

  async update(
    id: string,
    userFromReq: UpdateUserDto,
    userFromJwt: UserPayload,
  ) {
    try {
      helpers.checkRolePermission(id, userFromJwt);
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
          data.password = await bcrypt.hash(userFromReq.password, SALT_ROUNDS);
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
      throw new UserNotFoundException();
    } catch (err: any) {
      helpers.handleExeption(err);
      const errorStatus = err?.status
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
    helpers.checkRolePermission(id, userFromJwt);
    try {
      await this.prismaService.user.delete({
        where: { id },
      });
      return;
    } catch (err: any) {
      helpers.handleExeption(err);
      console.log(err);
      const errorStatus = err?.status
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
