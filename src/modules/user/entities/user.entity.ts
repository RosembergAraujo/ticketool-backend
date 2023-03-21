import { Role } from '@prisma/client';
// import { Role } from './role.entity';
export class User {
    id: string;
    email: string;
    password: string;
    name: string;
    cpfCnpj: string;
    role: Role;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserFromDatabase {
    id: string;
    email: string;
    password: string;
    name: string;
    cpfCnpj: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}
