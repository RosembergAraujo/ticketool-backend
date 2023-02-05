import { Body, Controller, Post } from '@nestjs/common';
import { CreateGeneralUserDto } from './dto/create-general_user.dto';
import { GeneralUserService } from './general_user.service';

@Controller('general-user')
export class GeneralUserController {
  constructor(private readonly generalUserService: GeneralUserService) {}

  @Post()
  create(@Body() createGeneralUserDto: CreateGeneralUserDto) {
    return this.generalUserService.create(createGeneralUserDto);
  }
}
