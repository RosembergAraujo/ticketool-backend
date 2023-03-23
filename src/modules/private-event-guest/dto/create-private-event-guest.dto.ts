import { z } from 'zod';

export const createPrivateEventGuestDtoSchema = z.object({
    userId: z.string().uuid(),
    eventId: z.string().uuid(),
});

export type CreatePrivateEventGuestDto = z.infer<
    typeof createPrivateEventGuestDtoSchema
>;
