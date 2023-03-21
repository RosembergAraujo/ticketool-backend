import { Role } from '@prisma/client';

export interface responseUser {
    id?: string;
    email: string;
    password?: string;
    name: string;
    cpfCnpj: string;
    role?: Role;
}
