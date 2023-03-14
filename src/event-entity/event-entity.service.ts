import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CanGetEvent } from '@prisma/client';
import { UserPayload } from 'src/auth/models/UserPayload';
import { ForbiddenException } from 'src/exeptions/forbidden.exception';
import { NotFoundException } from 'src/exeptions/user-not-found.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { HIGH_PRIVILEGES_APP_ROLES, Role } from 'src/user/entities/role.entity';
import { helpers } from 'src/user/helpers/helpers';
import { checkCanCreateWithoutAuth } from 'src/user/utils/RoleValidation';
import {
  CreateEventEntityDto,
  CreateEventEntityDtoInput,
  createEventEntityDtoSchema,
} from './dtos/create-event-entity.dto';
import { EventEntity } from './entities/event-entity.entity';

@Injectable()
export class EventEntityService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createEventEntityDto: CreateEventEntityDtoInput,
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

  async findAllPublicEvents(): Promise<EventEntity[]> {
    return await this.prismaService.eventEntity.findMany({
      where: {
        published: true,
        visible: true,
      },
    });
  }

  async findById(id: string, userFromJwt: UserPayload): Promise<EventEntity> {
    try {
      const eventEntityFromDatabase: EventEntity | null =
        await this.prismaService.eventEntity.findUnique({
          where: {
            id,
          },
        });
      if (eventEntityFromDatabase) {
        if (
          (eventEntityFromDatabase.published &&
            eventEntityFromDatabase.visible) ||
          userFromJwt.id === eventEntityFromDatabase.userId ||
          HIGH_PRIVILEGES_APP_ROLES.includes(userFromJwt.role as Role)
        ) {
          return eventEntityFromDatabase;
        }
        const canSeeEvent: CanGetEvent | null =
          await this.prismaService.canGetEvent.findFirst({
            where: {
              userId: userFromJwt.id,
              eventId: eventEntityFromDatabase.id,
            },
          });
        if (canSeeEvent) return eventEntityFromDatabase;
        throw new ForbiddenException();
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

  // update(id: number, updateEventEntityDto: UpdateEventEntityDto) {
  //   return `This action updates a #${id} eventEntity`;
  // }

  remove(id: number) {
    return `This action removes a #${id} eventEntity`;
  }
}
