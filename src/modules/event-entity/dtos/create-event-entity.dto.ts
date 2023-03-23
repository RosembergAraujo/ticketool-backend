import { string, z } from 'zod';
import { EventCategory } from '../entities/event-category.entity';

export const createEventEntityDtoSchema = z.object({
    tittle: string().min(1, { message: 'Tittle field must be not empty' }),
    description: string().min(1, {
        message: 'Description field must be not empty',
    }),
    eventCategory: z.nativeEnum(EventCategory),
    published: z.boolean(),
    visible: z.boolean(),
    isPublic: z.boolean(),
    startsAt: z
        .string()
        .min(1, { message: 'StartsAt field must be not empty' })
        .datetime({
            message: 'StartsAt must be a valid date as string',
        })
        .transform((x: string): Date => new Date(x)),
    expiresAt: z
        .string()
        .min(1, { message: 'ExpiresAt field must be not empty' })
        .datetime({
            message: 'ExpiresAt must be a valid date as string',
        })
        .transform((x: string): Date => new Date(x)),
});

export type CreateEventEntityDto = z.infer<typeof createEventEntityDtoSchema>;
export type CreateEventEntityDtoInput = z.input<
    typeof createEventEntityDtoSchema
>;
export type CreateEventEntityDtoOutput = z.output<
    typeof createEventEntityDtoSchema
>;
