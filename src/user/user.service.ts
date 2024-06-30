import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { genSalt, hash } from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { SignupResponse } from './types';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser({
    email,
    password,
    role,
  }: CreateUserDto): Promise<SignupResponse> {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    const createdUser = await this.prisma.user.create({
      data: { email, role, hashedPassword },
    });

    return {
      id: createdUser.id,
      email: createdUser.email,
      role: createdUser.role,
    };
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
