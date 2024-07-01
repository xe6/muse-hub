export type ArtistModel = {
  id: number;
  name: string;
  genre: string;
  country: string;
  spotifyUrl: string;
  userId?: number;
  managerId?: number;
};

export enum UserRole {
  ARTIST = 'ARTIST',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
  UNKNOWN = 'UNKNOWN',
}
