import { Module } from '@nestjs/common';
import { SrvController } from './srv.controller';
import { SrvService } from './srv.service';
import { ArtistModule } from './artist/artist.module';

@Module({
  imports: [ArtistModule],
  controllers: [SrvController],
  providers: [SrvService],
})
export class SrvModule {}
