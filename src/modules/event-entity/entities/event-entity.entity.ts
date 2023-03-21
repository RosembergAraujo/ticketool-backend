// import { EventCategory } from './event-category.entity';

import { EventCategory } from '@prisma/client';
import { User } from 'src/modules/user/entities/user.entity';

export class EventEntity {
    id: string;
    tittle: string;
    description: string;
    eventCategory: EventCategory;
    published: boolean;
    visible: boolean;
    isPublic: boolean;
    userId: string;
    startsAt: Date;
    expiresAt: Date;
    createdAt?: Date;
    updatedAt?: Date;
    user?: User;
}

export class EventEntityFromDatabase {
    id: string;
    tittle: string;
    description: string;
    eventCategory: EventCategory;
    published: boolean;
    visible: boolean;
    isPublic: boolean;
    userId: string;
    startsAt: Date;
    expiresAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
