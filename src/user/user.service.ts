import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { responseCreatedUserDto } from './dto/response-created-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION,
  Role,
} from './entities/role.entity';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createUserDto: CreateUserDto,
    // userFromJwt: UserPayload,
  ): Promise<responseCreatedUserDto> {
    const data: CreateUserDto = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };
    this.checkRolePermission(createUserDto.role);
    try {
      const createdUser = await this.prismaService.user.create({ data });
      return {
        ...createdUser,
      };
    } catch (err) {
      console.log('MESSAGE: ', err.message);
      // if (err instanceof PrismaClientKnownRequestError)
      //   this.handlePrismaExeption(err);
      throw new HttpException(
        err,
        err?.code === 'P2002'
          ? HttpStatus.CONFLICT
          : HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: new Error(err.message),
        },
      );
    }
  }

  findByEmail(email: string) {
    return this.prismaService.user.findUnique({ where: { email } });
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  checkRolePermission(role: Role) {
    if (!ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION.includes(role))
      throw new HttpException(
        'You do not have permission to do this',
        HttpStatus.FORBIDDEN,
      );
  }
  // private handlePrismaExeption(err: PrismaClientKnownRequestError) {
  //   if (err.code === 'P2002')
  //     throw new HttpException('This email already used', HttpStatus.CONFLICT, {
  //       cause: new Error(err.message),
  //     });
  // }
}
