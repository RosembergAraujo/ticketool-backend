import { Module } from '@nestjs/common';
import { GeneralUserService } from './general_user.service';
import { GeneralUserController } from './general_user.controller';

@Module({
  controllers: [GeneralUserController],
  providers: [GeneralUserService],
})
export class GeneralUserModule {}
