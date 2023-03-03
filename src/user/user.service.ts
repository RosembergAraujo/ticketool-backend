import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Role } from '@prisma/client';
// import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { UserPayload } from 'src/auth/models/UserPayload';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  HIGH_PRIVILEGES_APP_ROLES,
  ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION,
} from './entities/role.entity';
import { User } from './entities/user.entity';

// import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      role: createUserDto.role || Role.USER,
    };
    this.checkCanCreateWithoutAuth(data.role);
    try {
      const createdUser: User = await this.prismaService.user.create({ data });
      return {
        ...createdUser,
        password: undefined,
        role: undefined,
      };
    } catch (err) {
      if (err.constructor.name === PrismaClientKnownRequestError.name)
        this.handlePrismaExeption(err);
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error(err.message),
      });
    }
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({
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

  async findOne(id: string, userFromJwt: UserPayload) {
    this.checkRolePermission(id, userFromJwt);
    const userFound: User = await this.prismaService.user.findUnique({
      where: { id },
    });
    return {
      ...userFound,
      password: undefined,
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    userFromJwt: UserPayload,
  ) {
    this.checkRolePermission(id, userFromJwt);
    const findUser = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  checkRolePermission(id: string, userFromJwt: UserPayload) {
    if (
      !HIGH_PRIVILEGES_APP_ROLES.includes(userFromJwt.role) &&
      userFromJwt.id !== id
    )
      throw new HttpException(
        'You do not have permission to do this',
        HttpStatus.FORBIDDEN,
      );
  }

  checkCanCreateWithoutAuth(role: Role) {
    if (!ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION.includes(role))
      throw new HttpException(
        'You do not have permission to do this',
        HttpStatus.FORBIDDEN,
      );
  }

  handlePrismaExeption(err: PrismaClientKnownRequestError) {
    if (err.code === 'P2002')
      throw new HttpException('This email already used', HttpStatus.CONFLICT, {
        cause: new Error(err.message),
      });
  }
}
