import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RequireRolesGuard } from './auth/guards/require-roles.guard';
import { EventEntityModule } from './modules/event-entity/event-entity.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrivateEventGuestModule } from './modules/private-event-guest/private-event-guest.module';
import { UserModule } from './modules/user/user.module';

@Module({
    imports: [
        PrismaModule,
        UserModule,
        AuthModule,
        EventEntityModule,
        PrivateEventGuestModule,
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RequireRolesGuard,
        },
    ],
})
export class AppModule {}
