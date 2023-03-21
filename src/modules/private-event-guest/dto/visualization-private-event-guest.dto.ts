import { vizualizationEventEntityDtoSchemaWithoutUser } from 'src/modules/event-entity/dtos/vizualization-event-entity.dto';
import { visualizationUserDtoSchema } from 'src/modules/user/dtos/visualization-user.dto';
import { z } from 'zod';

export const responsePrivateEventGuestDtoSchema = z
    .object({
        id: z.number(),
        userId: z.string().uuid(),
        eventId: z.string().uuid(),
        user: visualizationUserDtoSchema,
        event: vizualizationEventEntityDtoSchemaWithoutUser,
    })
    .array();

export type ResponsePrivateEventGuestDto = z.infer<
    typeof responsePrivateEventGuestDtoSchema
>;
