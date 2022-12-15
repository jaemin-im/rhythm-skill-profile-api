import { UserModule } from 'src/user/user.module';

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './auth.guard';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthResolver,
    AuthService,
  ],
})
export class AuthModule {}
