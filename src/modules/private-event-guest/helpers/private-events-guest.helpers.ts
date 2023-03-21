import { Injectable } from '@nestjs/common';
import { EventEntity } from '@prisma/client';
import { UserPayload } from 'src/auth/models/UserPayload';
import { ForbiddenException } from 'src/exeptions/forbidden.exception';
import { NotFoundException } from 'src/exeptions/not-found.exception';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import {
    HIGH_PRIVILEGES_APP_ROLES,
    Role,
} from 'src/modules/user/entities/role.entity';

@Injectable()
export class PrivateEventsGuestHelpers {
    constructor(private readonly _prismaService: PrismaService) {}
    async checkEventValidOwnershipOfEvent(
        eventId: string,
        // eventUserId: string,
        userFromJwt: UserPayload,
    ): Promise<void> {
        const eventEntity: EventEntity | null =
            await this._prismaService.eventEntity.findUnique({
                where: {
                    id: eventId,
                },
            });
        if (!eventEntity) throw new NotFoundException('This event dont exists');
        if (
            eventEntity.userId !== userFromJwt.id &&
            !HIGH_PRIVILEGES_APP_ROLES.includes(userFromJwt.role as Role)
        )
            throw new ForbiddenException();
    }
}
