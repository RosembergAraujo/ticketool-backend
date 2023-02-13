import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { GeneralUserModule } from '../general_user/general_user.module';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
import { AppConstraints } from '../Constraints/AppConstraints';

@Module({
  imports: [
    GeneralUserModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: AppConstraints.GENERAL_USER_TOKEN_TIME_TO_EXPIRE,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
