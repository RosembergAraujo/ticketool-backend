import { z } from 'zod';

export const visualizationUserDtoSchema = z.object({
    id: z
        .string()
        .min(1, { message: 'Must have a user' })
        .uuid({ message: 'Must be a valid UUID' }),
    email: z
        .string()
        .min(3, { message: 'Email field must be not empty' })
        .email({ message: 'Must be a valid email' })
        .transform((e: string): string => e.toLocaleLowerCase()),
    name: z.string().min(1, { message: 'Name field must be not empty' }),
});

export type VisualizationUserDto = z.infer<typeof visualizationUserDtoSchema>;
