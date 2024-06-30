import { User } from '@prisma/client';

export type SignupResponse = Omit<User, 'hashedPassword'>;

export enum UserRole {
  ARTIST = 'ARTIST',
  MANAGER = 'MANAGER',
  ADMIN = 'ADMIN',
}
