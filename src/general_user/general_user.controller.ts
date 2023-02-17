import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UserPayload } from 'src/auth/models/UserPayload';
import { CreateGeneralUserDto } from './dto/create-general_user.dto';
import { GeneralUserService } from './general_user.service';

@Controller('general-user')
export class GeneralUserController {
  constructor(private readonly generalUserService: GeneralUserService) {}

  @IsPublic()
  @Post()
  create(
    @CurrentUser() userFromJwt: UserPayload,
    @Body() createGeneralUserDto: CreateGeneralUserDto,
  ) {
    return this.generalUserService.create(createGeneralUserDto, userFromJwt);
  }
}
