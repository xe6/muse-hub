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
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CreateArtistDto, SetManagedDto, SetProfileDto } from './dto';
import { Roles } from 'src/auth/role.decorator';
import { UserRole } from 'src/user/types';
import { GetJWTPayload } from 'src/auth/get-jwt-payload.decorator';
import { JWTPayload } from 'src/auth/types';

@ApiTags('artists')
@ApiBearerAuth()
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Roles([UserRole.ADMIN])
  @ApiQuery({ name: 'name', required: false, type: String })
  @Get()
  async getArtists(@Query('name') name?: string): Promise<Artist[]> {
    return this.artistService.getArtists(name);
  }

  @Roles([UserRole.ADMIN])
  @Post()
  async createArtist(@Body() data: CreateArtistDto): Promise<Artist> {
    return this.artistService.createArtist(data);
  }

  @Roles([UserRole.ARTIST])
  @Get('/unassigned')
  async getUnassignedArtists(): Promise<Artist[]> {
    return this.artistService.getUnassignedArtists();
  }

  @Roles([UserRole.ARTIST])
  @Get('/my-profile')
  async getOwnArtist(@GetJWTPayload() jwtPayload: JWTPayload): Promise<Artist> {
    return this.artistService.getOwnArtist(jwtPayload.id);
  }

  @Roles([UserRole.ARTIST])
  @Post('/my-profile')
  async setOwnArtist(
    @Body() { artistId }: SetProfileDto,
    @GetJWTPayload() { id }: JWTPayload,
  ): Promise<Artist> {
    return this.artistService.setOwnArtist(artistId, id);
  }

  @Roles([UserRole.MANAGER])
  @Get('/unmanaged')
  async getUnmanagedArtists(): Promise<Artist[]> {
    return this.artistService.getUnmanagedArtists();
  }

  @Roles([UserRole.MANAGER])
  @Get('/managed')
  async getManagedArtists(
    @GetJWTPayload() { id }: JWTPayload,
  ): Promise<Artist[]> {
    return this.artistService.getManagedArtists(id);
  }

  @Roles([UserRole.MANAGER])
  @Post('/managed')
  async setManagedArtists(
    @Body() { artistIds }: SetManagedDto,
    @GetJWTPayload() { id }: JWTPayload,
  ): Promise<Artist[]> {
    return this.artistService.setManagedArtists(artistIds, id);
  }

  // >> This method has complex authorization logic that cannot be handled by @Roles decorator
  @Get('I:id')
  async getArtistById(
    @Param('id', ParseIntPipe) id: number,
    @GetJWTPayload() { id: userId, role }: JWTPayload,
  ): Promise<Artist> {
    return this.artistService.getArtistById(id, userId, role);
  }
}
