import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RequireRolesGuard } from './auth/guards/require-roles.guard';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EventEntityModule } from './event-entity/event-entity.module';

@Module({
  imports: [PrismaModule, UserModule, AuthModule, EventEntityModule],
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
