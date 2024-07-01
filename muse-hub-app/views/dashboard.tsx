'use client';
import { useEffect, useState } from 'react';
import { UserRole } from '@/models';
import { AdminDashboard } from './admin-dashboard';
import { ArtistDashboard } from './artist-dashboard';
import { ManagerDashboard } from './manager-dashboard';

export function DashboardComponent() {
  const [user, setUser] = useState<{ id: number; role: UserRole }>({
    id: 0,
    role: UserRole.UNKNOWN,
  });
  useEffect(() => {
    const parsedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(parsedUser);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {renderDashboard(user.role)}
    </div>
  );
}

const renderDashboard = (role: UserRole) => {
  switch (role) {
    case UserRole.ARTIST:
      return <ArtistDashboard />;
    case UserRole.MANAGER:
      return <ManagerDashboard />;
    case UserRole.ADMIN:
      return <AdminDashboard />;
    default:
      return <p>Loading...</p>;
  }
};
