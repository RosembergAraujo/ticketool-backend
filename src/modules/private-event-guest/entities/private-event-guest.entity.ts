import { EventEntity } from 'src/modules/event-entity/entities/event-entity.entity';
import { User } from 'src/modules/user/entities/user.entity';

export class PrivateEventGuest {
    id: number;
    userId: string;
    eventId: string;
    user?: User;
    event?: EventEntity;
}

export class PrivateEventGuestFromDatabase {
    id: number;
    userId: string;
    eventId: string;
    user: User;
    event: EventEntity;
}
