import { Role } from '@prisma/client';
import { z } from 'zod';

// export class CreateUserDto {
//   email: string;

//   password: string;

//   name: string;

//   cpfCnpj: string;

//   role?: Role;
// }

export const createUserDtoSchema = z.object({
  email: z
    .string()
    .min(3, { message: 'Email field must be not empty' })
    .email({ message: 'Must be a valid email' })
    .transform((e) => e.toLocaleLowerCase()),
  password: z
    .string()
    .min(6, { message: 'Password field can not have less then 6 characters' })
    .regex(/((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'Password must be more complex',
    }),
  name: z.string().min(1, { message: 'Name field must be not empty' }),
  cpfCnpj: z
    .string()
    .regex(
      /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}\-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2})$/,
      { message: 'Must be a valid CPF or CPNJ' },
    ),
  role: z.enum([Role.ADMIN, Role.MANAGER, Role.USER]),
});

export type CreateUserDto = z.infer<typeof createUserDtoSchema>;
