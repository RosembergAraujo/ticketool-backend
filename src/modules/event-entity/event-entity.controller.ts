import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
} from '@nestjs/common';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UserPayload } from 'src/auth/models/UserPayload';
import { CreateEventEntityDtoInput } from './dtos/create-event-entity.dto';
import { VizualizationEventEntityDto } from './dtos/vizualization-event-entity.dto';
import { EventEntity } from './entities/event-entity.entity';
import { EventEntityService } from './event-entity.service';

@Controller('event_entity')
export class EventEntityController {
    constructor(private readonly _eventEntityService: EventEntityService) {}

    @IsPublic()
    @Post()
    create(
        @CurrentUser() userFromJwt: UserPayload,
        @Body() createEventEntityDto: CreateEventEntityDtoInput,
    ): Promise<VizualizationEventEntityDto> {
        return this._eventEntityService.create(
            createEventEntityDto,
            userFromJwt,
        );
    }

    @IsPublic()
    @Get('public_events')
    findAllPublicEvents(): Promise<EventEntity[]> {
        return this._eventEntityService.findAllPublicEvents();
    }

    @IsPublic()
    @Get(':id')
    async findOne(
        @Param('id') id: string,
        @CurrentUser() userFromJwt: UserPayload,
    ): Promise<VizualizationEventEntityDto> {
        return this._eventEntityService.findById(id, userFromJwt);
    }

    @Delete(':id')
    @HttpCode(204)
    delete(
        @Param('id') id: string,
        @CurrentUser() userFromJwt: UserPayload,
    ): Promise<void> {
        return this._eventEntityService.remove(id, userFromJwt);
    }

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
