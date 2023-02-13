import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGeneralUserDto } from './dto/create-general_user.dto';
import { UpdateGeneralUserDto } from './dto/update-general_user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GeneralUserService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createGeneralUserDto: CreateGeneralUserDto) {
    const data = {
      ...createGeneralUserDto,
      password: await bcrypt.hash(createGeneralUserDto.password, 10),
    };
    const createdUser = await this.prismaService.generalUser.create({ data });
    return {
      ...createdUser,
      password: undefined,
    };
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
}
