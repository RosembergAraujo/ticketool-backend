import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
    // @CurrentUser() userFromJwt: UserPayload,
    @Body() createUserDto: CreateUserDto,
  ) {
    // return this._userService.create(createUserDto, userFromJwt);
    return this._userService.create(createUserDto);
  }

  // @Put(':id')
  // update(
  //   @CurrentUser() userFromJwt: UserPayload,
  //   @Param('id') id: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ) {
  //   // return this._userService.create(createUserDto, userFromJwt);
  //   return this._userService.update(id, updateUserDto, userFromJwt);
  // }

  @Get(':id')
  get(@Param('id') id: string, @CurrentUser() userFromJwt: UserPayload) {
    return this._userService.findOne(id, userFromJwt);
  }
}
