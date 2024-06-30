'use client';

import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function Logout() {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    router.push('/login');
  };

  return (
    <Button className="absolute top-8 right-8" onClick={handleLogout}>
      Logout
    </Button>
  );
}
