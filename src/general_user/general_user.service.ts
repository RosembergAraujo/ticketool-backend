import { Injectable } from '@nestjs/common';
import { CreateGeneralUserDto } from './dto/create-general_user.dto';
import { UpdateGeneralUserDto } from './dto/update-general_user.dto';

@Injectable()
export class GeneralUserService {
  create(createGeneralUserDto: CreateGeneralUserDto) {
    return 'This action adds a new generalUser';
  }

  findAll() {
    return `This action returns all generalUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} generalUser`;
  }

  update(id: number, updateGeneralUserDto: UpdateGeneralUserDto) {
    return `This action updates a #${id} generalUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} generalUser`;
  }
}
