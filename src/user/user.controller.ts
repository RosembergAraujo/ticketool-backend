import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UserPayload } from 'src/auth/models/UserPayload';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @IsPublic()
  @Post()
  create(
    @CurrentUser() userFromJwt: UserPayload,
    @Body() createUserDto: CreateUserDto,
  ) {
    // return this._userService.create(createUserDto, userFromJwt);
    return this._userService.create(createUserDto);
  }
}
