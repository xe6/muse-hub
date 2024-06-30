import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './auth.controller';
import { RoleGuard } from './role.guard';

@Module({
  imports: [ConfigModule, UserModule, JwtModule],
  controllers: [AuthController],
  providers: [
    {
      // >> Apply AuthGuard globally to all controllers and respective routes
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      // >> Apply RoleGuard globally to all controllers and respective routes
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    AuthService,
  ],
})
export class AuthModule {}
