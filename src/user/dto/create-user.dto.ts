import {
  IsEmail,
  IsEnum,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Role } from '../entities/role.entity';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
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
  role: Role;
}
