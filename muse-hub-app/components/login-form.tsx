'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { jwtDecode } from 'jwt-decode';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosInstance from '@/utils/axios-instance';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.accessToken);
      const decodedToken = jwtDecode(response.data.accessToken);
      // >> TODO: Use Context instead of localStorage
      localStorage.setItem('user', JSON.stringify(decodedToken));
      toast.success('Logged in successfully');
      router.push('/dashboard');
      // You can redirect the user to a different page or save the token in localStorage
    } catch (error: any) {
      // Handle error
      toast.error('Invalid credentials');
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
