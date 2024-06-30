import { UserRole } from 'src/user/types';

export type JWTPayload = {
  id: number;
  email: string;
  role: UserRole;
};

export type SignInResponse = {
  accessToken: string;
};
