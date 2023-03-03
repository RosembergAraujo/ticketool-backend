import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
// import { Role } from '../entities/role.entity';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @MinLength(4)
  @MaxLength(320)
  @IsEmail()
  email: string;

  @MinLength(6)
  @MaxLength(23)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @IsString()
  password: string;

  @MinLength(3)
  @MaxLength(25)
  @IsString()
  name: string;

  @MinLength(11)
  @MaxLength(23)
  @IsString()
  cpfCnpj: string;

  @IsString()
  @IsEnum(Role)
  @IsOptional()
  role?: Role;
}
