import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as bcrypt from 'bcrypt';
import {
  AppRoles,
  ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION,
} from 'src/Constraints/AppRoles';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserPayload } from '../auth/models/UserPayload';
import { CreateGeneralUserDto } from './dto/create-general_user.dto';
import { UpdateGeneralUserDto } from './dto/update-general_user.dto';
import { GeneralUser } from './entities/general_user.entity';

@Injectable()
export class GeneralUserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createGeneralUserDto: CreateGeneralUserDto,
    userFromJwt: UserPayload,
  ): Promise<GeneralUser> {
    const data = {
      ...createGeneralUserDto,
      password: await bcrypt.hash(createGeneralUserDto.password, 10),
    };
    if (
      !ROLES_THAT_CAN_BE_CREATED_WITHOUT_AUTHORIZATION.includes(
        createGeneralUserDto.roleId,
      )
    ) {
      this.checkRolePermission(createGeneralUserDto, userFromJwt);
    }
    try {
      const createdUser = await this.prismaService.generalUser.create({ data });
      return {
        ...createdUser,
        password: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        roleId: undefined,
      };
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError && err.code === 'P2002')
        throw new HttpException(
          'This email already used',
          HttpStatus.CONFLICT,
          {
            cause: new Error(err.message),
          },
        );

      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: new Error('ERRO MALUCO'),
      });
    }
  }

  findByEmail(email: string) {
    return this.prismaService.generalUser.findUnique({ where: { email } });
  }

  findAll() {
    return `This action returns all generalUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generalUser`;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateGeneralUserDto: UpdateGeneralUserDto) {
    return `This action updates a #${id} generalUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} generalUser`;
  }

  private checkRolePermission(
    userToBeChecked: CreateGeneralUserDto,
    userFromJwt: UserPayload,
  ): void {
    const roleByNumber = AppRoles[userFromJwt.role];
    if (userToBeChecked.roleId >= roleByNumber) return;
    throw new ForbiddenException('You do not have permission to do this');
  }
}
