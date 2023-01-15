import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateGeneralUserDto } from './dto/create-general_user.dto';
import { UpdateGeneralUserDto } from './dto/update-general_user.dto';
import { GeneralUserService } from './general_user.service';

@Controller('general-user')
export class GeneralUserController {
  constructor(private readonly generalUserService: GeneralUserService) {}

  @Post()
  create(@Body() createGeneralUserDto: CreateGeneralUserDto) {
    return this.generalUserService.create(createGeneralUserDto);
  }

  @Get()
  findAll() {
    return this.generalUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalUserService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGeneralUserDto: UpdateGeneralUserDto,
  ) {
    return this.generalUserService.update(+id, updateGeneralUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.generalUserService.remove(+id);
  }
}
