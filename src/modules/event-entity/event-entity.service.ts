import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrivateEventGuest } from '@prisma/client';
import { UserPayload } from 'src/auth/models/UserPayload';
import { ForbiddenException } from 'src/exeptions/forbidden.exception';
import { ExeptionHelpers } from 'src/exeptions/helpers/exeption.helpers';
import { NotFoundException } from 'src/exeptions/not-found.exception';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
    HIGH_PRIVILEGES_APP_ROLES,
    Role,
} from 'src/modules/user/entities/role.entity';
import { checkCanCreateWithoutAuth } from 'src/modules/user/utils/RoleValidation';
import { PrivateEventsGuestHelpers } from '../private-event-guest/helpers/private-events-guest.helpers';
import {
    CreateEventEntityDto,
    CreateEventEntityDtoInput,
    createEventEntityDtoSchema,
} from './dtos/create-event-entity.dto';
import {
    VizualizationEventEntityDto,
    vizualizationEventEntityDtoSchema,
} from './dtos/vizualization-event-entity.dto';
import { EventEntity } from './entities/event-entity.entity';

@Injectable()
export class EventEntityService {
    constructor(
        private readonly _privateEventsGuestHelpers: PrivateEventsGuestHelpers,
        private readonly _prismaService: PrismaService,
    ) {
        _privateEventsGuestHelpers = new PrivateEventsGuestHelpers(
            _prismaService,
        );
    }
    async create(
        createEventEntityDto: CreateEventEntityDtoInput,
        userPayload: UserPayload,
    ): Promise<VizualizationEventEntityDto> {
        try {
            const data: CreateEventEntityDto =
                createEventEntityDtoSchema.parse(createEventEntityDto);
            checkCanCreateWithoutAuth(userPayload.role as Role, userPayload);
            const createdEventEntity: EventEntity =
                await this._prismaService.eventEntity.create({
                    data: {
                        ...data,
                        userId: userPayload.id,
                    },
                    include: {
                        user: true,
                    },
                });
            return vizualizationEventEntityDtoSchema.parse(createdEventEntity);
        } catch (err: any) {
            ExeptionHelpers.handleExeption(err);
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
        return await this._prismaService.eventEntity.findMany({
            where: {
                published: true,
                visible: true,
            },
        });
    }

    async findById(
        id: string,
        userFromJwt: UserPayload,
    ): Promise<VizualizationEventEntityDto> {
        try {
            const eventEntityFromDatabase: EventEntity | null =
                await this._prismaService.eventEntity.findUnique({
                    where: {
                        id,
                    },
                    include: {
                        user: true,
                    },
                });
            if (eventEntityFromDatabase) {
                if (
                    (eventEntityFromDatabase.published &&
                        eventEntityFromDatabase.visible &&
                        eventEntityFromDatabase.isPublic) ||
                    userFromJwt.id === eventEntityFromDatabase.userId ||
                    HIGH_PRIVILEGES_APP_ROLES.includes(userFromJwt.role as Role)
                )
                    return vizualizationEventEntityDtoSchema.parse(
                        eventEntityFromDatabase,
                    );
                const canSeeEvent: PrivateEventGuest | null =
                    await this._prismaService.privateEventGuest.findFirst({
                        where: {
                            userId: userFromJwt.id,
                            eventId: eventEntityFromDatabase.id,
                        },
                    });
                if (canSeeEvent)
                    return vizualizationEventEntityDtoSchema.parse(
                        eventEntityFromDatabase,
                    );
                throw new ForbiddenException();
            }
            throw new NotFoundException();
        } catch (err: any) {
            ExeptionHelpers.handleExeption(err);
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
        try {
            const validOwnership: boolean | HttpException =
                await this._privateEventsGuestHelpers.checkEventValidOwnershipOfEvent(
                    id,
                    userFromJwt,
                );
            if (validOwnership instanceof HttpException) throw validOwnership;
            await this._prismaService.eventEntity.delete({ where: { id } });
        } catch (err: any) {
            ExeptionHelpers.handleExeption(err);
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

    // remove(id: number) {
    //   return `This action removes a #${id} eventEntity`;
    // }
}
