import { z } from 'zod';

export const deletePrivateEventGuestDtoSchema = z.object({
    userId: z.string().uuid(),
    eventId: z.string().uuid(),
});

export type DeletePrivateEventGuestDto = z.infer<
    typeof deletePrivateEventGuestDtoSchema
>;
