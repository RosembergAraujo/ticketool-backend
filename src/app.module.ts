import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { GeneralUserModule } from './general_user/general_user.module';

@Module({
  imports: [PrismaModule, GeneralUserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
