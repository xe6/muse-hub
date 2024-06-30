import { Module } from '@nestjs/common';
import { SrvController } from './srv.controller';
import { SrvService } from './srv.service';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { JwtConfigModule } from './auth/jwt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtConfigModule,
    AuthModule,
    ArtistModule,
    UserModule,
  ],
  controllers: [SrvController],
  providers: [SrvService],
  exports: [],
})
export class SrvModule {}
