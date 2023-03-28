import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserPayload } from 'src/auth/models/UserPayload';
import { DuplicatedEmailException } from 'src/exeptions/duplicated-email.exception';
import { ExeptionHelpers } from 'src/exeptions/helpers/exeption.helpers';
import { NotFoundException } from 'src/exeptions/not-found.exception';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateUserDto, createUserDtoSchema } from './dtos/create-user.dto';
import { responseUser } from './dtos/response-user.dto';
import { UpdateUserDto, updateUserDtoSchema } from './dtos/update-user.dto';
import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import {
    checkCanCreateWithoutAuth,
    checkRolePermission,
} from './utils/RoleValidation';
import { createPasswordHashed } from './utils/password';

@Injectable()
export class UserService {
    constructor(private readonly _prismaService: PrismaService) {}
    async create(
        createUserDto: CreateUserDto,
        userPayload: UserPayload,
    ): Promise<responseUser> {
        try {
            const data: CreateUserDto = createUserDtoSchema.parse({
                ...createUserDto,
                role: createUserDto.role || Role.USER,
            });
            data.password = await createPasswordHashed(data.password);
            await checkCanCreateWithoutAuth(data.role as Role, userPayload);
            const createdUser: User = await this._prismaService.user.create({
                data,
            });
            return {
                ...createdUser,
                password: undefined,
                role: undefined,
            };
        } catch (err: any) {
            ExeptionHelpers.handleExeption(err);
            const errorStatus: any = err?.status
                ? err.status
                : HttpStatus.INTERNAL_SERVER_ERROR;
            throw new HttpException(
                {
                    status: errorStatus,
                    error: err.message,
                },
                errorStatus,
                {
                    cause: err,
                },
            );
        }
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this._prismaService.user.findUnique({
            where: { email },
        });
    }

    // findByEmail(email: string, userFromJwt: UserPayload = undefined) { //TESTAR DEPOIS COM TOKEN
    //   const userFromDatabase: any = this.prismaService.user.findUnique({
    //     where: { email },
    //   });
    //   if (userFromJwt)
    //     this.await checkRolePermission(userFromDatabase?.id, userFromJwt);
    //   return userFromDatabase;
    // }

    async findById(
        id: string,
        userFromJwt: UserPayload,
    ): Promise<responseUser | null> {
        try {
            await checkRolePermission(id, userFromJwt);
            const userFound: User | null =
                await this._prismaService.user.findUnique({
                    where: { id },
                });
            if (userFound)
                return {
                    ...userFound,
                    password: undefined,
                };
            throw new NotFoundException();
        } catch (err: any) {
            ExeptionHelpers.handleExeption(err);
            const errorStatus: any = err?.status
                ? err.status
                : HttpStatus.INTERNAL_SERVER_ERROR;
            throw new HttpException(
                {
                    status: errorStatus,
                    error: err.message,
                },
                errorStatus,
                {
                    cause: err,
                },
            );
        }
    }

    async update(
        id: string,
        userFromReq: UpdateUserDto,
        userFromJwt: UserPayload,
    ): Promise<responseUser> {
        try {
            await checkRolePermission(id, userFromJwt);
            const userFromDatabase: User | null =
                await this._prismaService.user.findUnique({
                    where: { id },
                });
            if (userFromDatabase) {
                const data: UpdateUserDto = updateUserDtoSchema.parse({
                    ...userFromDatabase,
                    ...userFromReq,
                });
                if (
                    userFromReq?.email &&
                    userFromReq.email !== userFromDatabase.email
                ) {
                    const userFoundByEmail: User | null =
                        await this._prismaService.user.findUnique({
                            where: { email: userFromReq.email },
                        });
                    if (userFoundByEmail) throw new DuplicatedEmailException();
                }
                if (userFromReq.password)
                    data.password = await createPasswordHashed(
                        userFromReq.password,
                    );
                const updatedUser: User = await this._prismaService.user.update(
                    {
                        where: { id },
                        data,
                    },
                );
                return {
                    ...updatedUser,
                    password: undefined,
                    role: undefined,
                };
            }
            throw new NotFoundException();
        } catch (err: any) {
            ExeptionHelpers.handleExeption(err);
            const errorStatus: any = err?.status
                ? err.status
                : HttpStatus.INTERNAL_SERVER_ERROR;
            throw new HttpException(
                {
                    status: errorStatus,
                    error: err.message,
                },
                errorStatus,
                {
                    cause: err,
                },
            );
        }
    }

    async remove(id: string, userFromJwt: UserPayload): Promise<void> {
        try {
            await checkRolePermission(id, userFromJwt);
            await this._prismaService.user.delete({
                where: { id },
            });
        } catch (err: any) {
            ExeptionHelpers.handleExeption(err);
            const errorStatus: any = err?.status
                ? err.status
                : HttpStatus.INTERNAL_SERVER_ERROR;
            throw new HttpException(
                {
                    status: errorStatus,
                    error: err.message,
                },
                errorStatus,
                {
                    cause: err,
                },
            );
        }
    }
}
