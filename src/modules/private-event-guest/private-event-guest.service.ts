/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserPayload } from 'src/auth/models/UserPayload';
import { ExeptionHelpers } from 'src/exeptions/helpers/exeption.helpers';
import { NotFoundException } from 'src/exeptions/not-found.exception';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
    CreatePrivateEventGuestDto,
    createPrivateEventGuestDtoSchema,
} from './dto/create-private-event-guest.dto';
import { DeletePrivateEventGuestDto } from './dto/delete-private-event-guest.dto';
import {
    ResponsePrivateEventGuestDto,
    responsePrivateEventGuestDtoSchema,
} from './dto/visualization-private-event-guest.dto';
import {
    PrivateEventGuest,
    PrivateEventGuestFromDatabase,
} from './entities/private-event-guest.entity';
import { PrivateEventsGuestHelpers } from './helpers/private-events-guest.helpers';

@Injectable()
export class PrivateEventGuestService {
    constructor(
        private readonly _prismaService: PrismaService,
        private readonly _privateEventsGuestHelpers: PrivateEventsGuestHelpers,
    ) {
        _privateEventsGuestHelpers = new PrivateEventsGuestHelpers(
            _prismaService,
        );
    }
    async create(
        createPrivateEventGuestDto: CreatePrivateEventGuestDto,
        userFromJwt: UserPayload,
    ): Promise<PrivateEventGuest> {
        try {
            const data: CreatePrivateEventGuestDto =
                createPrivateEventGuestDtoSchema.parse(
                    createPrivateEventGuestDto,
                );
            const validOwnership: boolean | HttpException =
                await this._privateEventsGuestHelpers.checkEventValidOwnershipOfEvent(
                    data.eventId,
                    userFromJwt,
                );
            if (validOwnership instanceof HttpException) throw validOwnership;
            const createdPrivateEventGuest: PrivateEventGuest =
                await this._prismaService.privateEventGuest.create({ data });
            return {
                ...createdPrivateEventGuest,
            };
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

    async findAllGuestsOfEvent(
        eventId: string,
        userFromJwt: UserPayload,
    ): Promise<ResponsePrivateEventGuestDto> {
        try {
            const privateEventGuestFromDatabase: PrivateEventGuest | null =
                await this._prismaService.privateEventGuest.findFirst({
                    where: {
                        eventId,
                    },
                });
            if (!privateEventGuestFromDatabase)
                throw new NotFoundException(
                    'A list for this event was not found',
                );
            const validOwnership: boolean | HttpException =
                await this._privateEventsGuestHelpers.checkEventValidOwnershipOfEvent(
                    eventId,
                    userFromJwt,
                );
            if (validOwnership instanceof HttpException) throw validOwnership;
            const response: PrivateEventGuestFromDatabase[] =
                await this._prismaService.privateEventGuest.findMany({
                    where: {
                        eventId,
                    },
                    include: {
                        user: true,
                        event: true,
                    },
                });

            return responsePrivateEventGuestDtoSchema.parse(response);
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

    async remove(
        deletePrivateEventGuestDto: DeletePrivateEventGuestDto,
        userFromJwt: UserPayload,
    ): Promise<void> {
        try {
            const validOwnership: boolean | HttpException =
                await this._privateEventsGuestHelpers.checkEventValidOwnershipOfEvent(
                    deletePrivateEventGuestDto.eventId,
                    userFromJwt,
                );
            if (validOwnership instanceof HttpException) throw validOwnership;
            await this._prismaService.privateEventGuest.deleteMany({
                where: {
                    eventId: deletePrivateEventGuestDto.eventId,
                    userId: deletePrivateEventGuestDto.userId,
                },
            });
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
}
