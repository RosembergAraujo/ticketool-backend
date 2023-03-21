import { EventCategory } from '@prisma/client';
import { visualizationUserDtoSchema } from 'src/modules/user/dtos/visualization-user.dto';
import { z } from 'zod';

export const vizualizationEventEntityDtoSchema = z.object({
    id: z
        .string()
        .min(1, { message: 'Must have a user' })
        .uuid({ message: 'Must be a valid UUID' }),
    tittle: z.string().min(1, { message: 'Tittle field must be not empty' }),
    description: z.string().min(1, {
        message: 'Description field must be not empty',
    }),
    eventCategory: z.nativeEnum(EventCategory),
    published: z.boolean(),
    visible: z.boolean(),
    isPublic: z.boolean(),
    startsAt: z.date(),
    expiresAt: z.date(),
    user: visualizationUserDtoSchema,
});

export const vizualizationEventEntityDtoSchemaWithoutUser = z.object({
    id: z
        .string()
        .min(1, { message: 'Must have a user' })
        .uuid({ message: 'Must be a valid UUID' }),
    tittle: z.string().min(1, { message: 'Tittle field must be not empty' }),
    description: z.string().min(1, {
        message: 'Description field must be not empty',
    }),
    eventCategory: z.nativeEnum(EventCategory),
    published: z.boolean(),
    visible: z.boolean(),
    isPublic: z.boolean(),
    startsAt: z.date(),
    expiresAt: z.date(),
});

export type VizualizationEventEntityDto = z.infer<
    typeof vizualizationEventEntityDtoSchema
>;
