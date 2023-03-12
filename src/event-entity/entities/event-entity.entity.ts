// import { EventCategory } from './event-category.entity';

import { EventCategory } from '@prisma/client';

export class EventEntity {
  id: string;
  tittle: string;
  description: string;
  eventCategory: EventCategory;
  published: boolean;
  visible: boolean;
  userId: string;
  startsAt: Date;
  expiresAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
