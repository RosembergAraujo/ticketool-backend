import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/modules/prisma/prisma.module';
import { PrivateEventsGuestHelpers } from '../private-event-guest/helpers/private-events-guest.helpers';
import { EventEntityController } from './event-entity.controller';
import { EventEntityService } from './event-entity.service';

@Module({
    imports: [PrismaModule],
    controllers: [EventEntityController],
    providers: [EventEntityService, PrivateEventsGuestHelpers],
})
export class EventEntityModule {}
