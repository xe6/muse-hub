import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { ConfigService } from '@nestjs/config';
import { compareSync } from 'bcrypt';
import { JWTPayload, SignInResponse } from './types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserRole } from 'src/user/types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, pass: string): Promise<SignInResponse> {
    const user = await this.userService.getUserByEmail(email);

    if (!user || !compareSync(pass, user.hashedPassword)) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const jwtPayload: JWTPayload = {
      id: user.id,
      email: user.email,
      role: user.role as UserRole,
    };

    const accessToken = this.jwtService.sign(jwtPayload, {
      secret: this.configService.get('JWT_SECRET'),
    });

    return { accessToken };
  }

  async signUp(data: CreateUserDto) {
    // >> Ensure such user does not yet exist
    const existingUser = await this.userService.getUserByEmail(data.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const user = await this.userService.createUser(data);
    return user;
  }
}
