import { object, string, z } from 'zod';

export const createPrivateEventGuestDtoSchema = object({
    userId: string().uuid(),
    eventId: string().uuid(),
});

export type CreatePrivateEventGuestDto = z.infer<
    typeof createPrivateEventGuestDtoSchema
>;
