import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GeneralUserController } from './general_user.controller';
import { GeneralUserService } from './general_user.service';

@Module({
  imports: [PrismaModule],
  controllers: [GeneralUserController],
  providers: [GeneralUserService],
  exports: [GeneralUserService],
})
export class GeneralUserModule {}
