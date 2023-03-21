import { z } from 'zod';

// export class LoginRequestBody {
//   email: string;
//   password: string;
// }

export const loginRequestBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type LoginRequestBody = z.infer<typeof loginRequestBodySchema>;
