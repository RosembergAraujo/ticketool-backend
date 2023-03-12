import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { EventEntityController } from './event-entity.controller';
import { EventEntityService } from './event-entity.service';

@Module({
  imports: [PrismaModule],
  controllers: [EventEntityController],
  providers: [EventEntityService],
})
export class EventEntityModule {}
