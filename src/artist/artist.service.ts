import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArtistDto } from './dto';
import { UserRole } from 'src/user/types';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async createArtist(data: CreateArtistDto) {
    return this.prisma.artist.create({
      data,
    });
  }

  async getArtistById(id: number, userId: number, role: UserRole) {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id,
      },
    });

    if (role === UserRole.ARTIST && artist.userId === userId) return artist;
    if (role === UserRole.MANAGER && artist.managerId === userId) return artist;
    if (role === UserRole.ADMIN) return artist;

    throw new ForbiddenException('You are not allowed to access this resource');
  }

  async getOwnArtist(userId: number) {
    return this.prisma.artist.findFirst({
      where: {
        userId,
      },
    });
  }

  async setOwnArtist(artistId: number, userId: number) {
    // >> Allow setting artist profile only for the first time
    const artistProfile = await this.getOwnArtist(userId);
    if (artistProfile) {
      throw new BadRequestException('Artist profile already set!');
    }
    try {
      const profileArtist = await this.prisma.artist.update({
        where: {
          id: artistId,
        },
        data: {
          userId,
        },
      });
      return profileArtist;
    } catch (_err) {
      throw new BadRequestException('Artist not found');
    }
  }

  async getManagedArtists(managerId: number) {
    return this.prisma.artist.findMany({
      where: {
        managerId,
      },
    });
  }

  async setManagedArtists(artistIds: number[], userId: number) {
    // >> Allow setting managed artists only for the first time
    const managedArtists = await this.getManagedArtists(userId);

    if (managedArtists.length > 0) {
      throw new BadRequestException('Managed artists already set!');
    }

    try {
      await this.prisma.artist.updateMany({
        where: {
          id: {
            in: artistIds,
          },
        },
        data: {
          managerId: userId,
        },
      });

      return this.prisma.artist.findMany({ where: { id: { in: artistIds } } });
    } catch (_err) {
      throw new BadRequestException('One or more artists not found');
    }
  }

  async getArtists(name: string) {
    return name
      ? this.prisma.artist.findMany({
          where: {
            name: {
              contains: name,
              mode: 'insensitive', // Makes the search case-insensitive
            },
          },
        })
      : this.prisma.artist.findMany();
  }

  async getUnassignedArtists() {
    return this.prisma.artist.findMany({
      where: {
        userId: null,
      },
    });
  }

  async getUnmanagedArtists() {
    return this.prisma.artist.findMany({
      where: {
        managerId: null,
      },
    });
  }
}
