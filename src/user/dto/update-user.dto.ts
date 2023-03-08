// import { PartialType } from '@nestjs/mapped-types';

import { Role } from '@prisma/client';
import { object, string, z } from 'zod';

// export class UpdateUserDto extends PartialType(CreateUserDto) {}

export const updateUserDtoSchema = object({
  email: string()
    .min(3, { message: 'Must be a valid email' })
    .email({ message: 'Must be a valid email' })
    .transform((e) => e.toLocaleLowerCase())
    .optional(),
  password: string()
    .min(6, { message: 'Password field can not have less then 6 characters' })
    .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'Password must have a uppercase letter, a lowercase letter and a number or special character',
    })
    .optional(),
  name: string().min(1, { message: 'Name field must be not empty' }).optional(),
  cpfCnpj: string()
    .regex(
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
      { message: 'Must be a valid CPF or CPNJ' },
    )
    .optional(),
  role: z.enum([Role.ADMIN, Role.MANAGER, Role.USER]).optional(),
});

export type UpdateUserDto = z.infer<typeof updateUserDtoSchema>;
