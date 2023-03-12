import { Body, Controller, Post } from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UserPayload } from 'src/auth/models/UserPayload';
import { CreateEventEntityDto } from './dtos/create-event-entity.dto';
import { EventEntity } from './entities/event-entity.entity';
import { EventEntityService } from './event-entity.service';

@Controller('event-entity')
export class EventEntityController {
  constructor(private readonly _eventEntityService: EventEntityService) {}

  @IsPublic()
  @Post()
  create(
    @CurrentUser() userFromJwt: UserPayload,
    @Body() createEventEntityDto: CreateEventEntityDto,
  ): Promise<EventEntity> {
    return this._eventEntityService.create(createEventEntityDto, userFromJwt);
  }

  // @Get()
  // findAll() {
  //   return this.eventEntityService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.eventEntityService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateEventEntityDto: UpdateEventEntityDto,
  // ) {
  //   return this.eventEntityService.update(+id, updateEventEntityDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.eventEntityService.remove(+id);
  // }
}
