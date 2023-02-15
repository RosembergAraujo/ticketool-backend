import {
  IsEmail,
  IsNumber,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { GeneralUser } from '../entities/general_user.entity';

export class CreateGeneralUserDto extends GeneralUser {
  @IsEmail()
  email: string;

  //Has min 1 upper, 1 lower, 1 number or special char
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @IsString()
  name: string;

  @IsNumber()
  roleId: number;
}
