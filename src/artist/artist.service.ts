import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}

  async createArtist(data: Prisma.ArtistCreateInput) {
    return this.prisma.artist.create({
      data,
    });
  }

  async getArtistById(id: number) {
    return this.prisma.artist.findUnique({
      where: {
        id,
      },
    });
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
}
