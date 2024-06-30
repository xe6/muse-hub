'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold pb-8">Welcome to Muse Hub</h1>
      <div className="flex space-x-4">
        <Link href="/login" passHref>
          <Button>Login</Button>
        </Link>

        <Link href="/signup" passHref>
          <Button>Signup</Button>
        </Link>
      </div>
    </main>
  );
}
