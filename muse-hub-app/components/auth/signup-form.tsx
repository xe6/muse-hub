'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/shadcn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn-ui/card';
import { Input } from '@/components/shadcn-ui/input';
import { Label } from '@/components/shadcn-ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../shadcn-ui/select';
import axiosInstance from '@/utils/axios-instance';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { UserRole } from '@/models';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!role) {
      toast.error('Please select a role');
      return;
    }
    try {
      await axiosInstance.post('/auth/signup', {
        email,
        password,
        role,
      });
      toast.success('Account created successfully');
      router.push('/login');
    } catch (error: any) {
      console.dir(error);
      toast.error(
        `Failed to create account: ${error?.response?.data?.message}`,
      );
    }
  };

  return (
    <Card className="mx-auto max-w-sm p-6">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
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
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              value={role}
              onValueChange={setRole}
              defaultValue={UserRole.ARTIST}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Roles</SelectLabel>
                  <SelectItem value={UserRole.ARTIST}>Artist</SelectItem>
                  <SelectItem value={UserRole.MANAGER}>Manager</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full mt-4">
            Create an account
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
