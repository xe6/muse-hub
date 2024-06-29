import { Prisma } from '@prisma/client';

export class CreateArtistDto implements Prisma.ArtistCreateInput {
  name: string;
  country: string;
  genre: string;
  spotifyUrl: string;
}
