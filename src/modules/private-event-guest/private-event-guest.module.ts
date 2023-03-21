import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrivateEventsGuestHelpers } from './helpers/private-events-guest.helpers';
import { PrivateEventGuestController } from './private-event-guest.controller';
import { PrivateEventGuestService } from './private-event-guest.service';

@Module({
    imports: [PrismaModule],
    controllers: [PrivateEventGuestController],
    providers: [PrivateEventGuestService, PrivateEventsGuestHelpers],
})
export class PrivateEventGuestModule {}
