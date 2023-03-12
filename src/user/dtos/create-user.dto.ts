// import { Role } from '@prisma/client';
import { object, string, z } from 'zod';
import { Role } from '../entities/role.entity';

export const createUserDtoSchema = object({
  email: string()
    .min(3, { message: 'Email field must be not empty' })
    .email({ message: 'Must be a valid email' })
    .transform((e: string): string => e.toLocaleLowerCase()),
  password: string()
    .min(6, { message: 'Password field can not have less then 6 characters' })
    .regex(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message:
        'Password must have a uppercase letter, a lowercase letter and a number or special character',
    }),
  name: string().min(1, { message: 'Name field must be not empty' }),
  cpfCnpj: string().regex(
    /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
    { message: 'Must be a valid CPF or CPNJ' },
  ),
  role: z.nativeEnum(Role),
});

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
