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
import { UserPayload } from 'src/auth/models/UserPayload';
import { CreatePrivateEventGuestDto } from './dto/create-private-event-guest.dto';
import { DeletePrivateEventGuestDto } from './dto/delete-private-event-guest.dto';
import { ResponsePrivateEventGuestDto } from './dto/visualization-private-event-guest.dto';
import { PrivateEventGuest } from './entities/private-event-guest.entity';
import { PrivateEventGuestService } from './private-event-guest.service';

@Controller('private_event_guest')
export class PrivateEventGuestController {
    constructor(
        private readonly _privateEventGuestService: PrivateEventGuestService,
    ) {}

    @Post()
    create(
        @Body() createPrivateEventGuestDto: CreatePrivateEventGuestDto,
        @CurrentUser() userFromJwt: UserPayload,
    ): Promise<PrivateEventGuest> {
        return this._privateEventGuestService.create(
            createPrivateEventGuestDto,
            userFromJwt,
        );
    }

    @Get('get_all_guests_of_an_event/:eventId')
    getAllGuestsOfEvent(
        @Param('eventId') eventId: string,
        @CurrentUser() userFromJwt: UserPayload,
    ): Promise<ResponsePrivateEventGuestDto> {
        return this._privateEventGuestService.findAllGuestsOfEvent(
            eventId,
            userFromJwt,
        );
    }

    @Delete()
    @HttpCode(204)
    delete(
        @Body() deletePrivateEventGuestDto: DeletePrivateEventGuestDto,
        @CurrentUser() userFromJwt: UserPayload,
    ): Promise<void> {
        return this._privateEventGuestService.remove(
            deletePrivateEventGuestDto,
            userFromJwt,
        );
    }
    // @Get('/check_can-get-event')
    // findAll() {}
}
