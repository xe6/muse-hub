import { Prisma } from '@prisma/client';
import { UserRole } from '../types';

export class CreateUserDto
  implements Omit<Prisma.UserCreateInput, 'hashedPassword'>
{
  email: string;
  role?: UserRole;
  password: string;
}
