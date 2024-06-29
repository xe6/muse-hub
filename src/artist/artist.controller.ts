import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from '@prisma/client';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateArtistDto } from './dto';

@ApiTags('artists')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @ApiQuery({ name: 'name', required: false, type: String })
  @Get()
  async searchArtist(@Query('name') name?: string): Promise<Artist[]> {
    return this.artistService.getArtists(name);
  }

  @Get(':id')
  async getArtistById(@Param('id', ParseIntPipe) id: number): Promise<Artist> {
    return this.artistService.getArtistById(id);
  }

  @Post()
  async createArtist(@Body() data: CreateArtistDto): Promise<Artist> {
    return this.artistService.createArtist(data);
  }
}
