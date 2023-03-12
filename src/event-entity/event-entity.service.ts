import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserPayload } from 'src/auth/models/UserPayload';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/user/entities/role.entity';
import { helpers } from 'src/user/helpers/helpers';
import { checkCanCreateWithoutAuth } from 'src/user/utils/RoleValidation';
import {
  CreateEventEntityDto,
  createEventEntityDtoSchema,
} from './dtos/create-event-entity.dto';
import { EventEntity } from './entities/event-entity.entity';

@Injectable()
export class EventEntityService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createEventEntityDto: CreateEventEntityDto,
    userPayload: UserPayload,
  ): Promise<EventEntity> {
    try {
      const data: CreateEventEntityDto = createEventEntityDtoSchema.parse({
        ...createEventEntityDto,
      });
      checkCanCreateWithoutAuth(userPayload.role as Role, userPayload);
      const createdEventEntity: EventEntity =
        await this.prismaService.eventEntity.create({ data });
      return {
        ...createdEventEntity,
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

  findAll() {
    return `This action returns all eventEntity`;
  }

  findOne(id: number) {
    return `This action returns a #${id} eventEntity`;
  }

  // update(id: number, updateEventEntityDto: UpdateEventEntityDto) {
  //   return `This action updates a #${id} eventEntity`;
  // }

  remove(id: number) {
    return `This action removes a #${id} eventEntity`;
  }
}