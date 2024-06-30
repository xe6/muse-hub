'use client';
import { useState } from 'react';
import { AdminDashboard } from './admin-dashboard';

export function DashboardComponent() {
  const [user] = useState(JSON.parse(localStorage.getItem('user') || '{}'));

  return (
    <div className="flex justify-center items-center min-h-screen">
      {renderDashboard(user.role)}
    </div>
  );
}

const renderDashboard = (role: string) => {
  switch (role) {
    case 'ARTIST':
      //   return <ArtistDashboard />;
      return <p>Artist</p>;
    case 'MANAGER':
      //   return <ManagerDashboard />;
      return <p>Manager</p>;
    case 'ADMIN':
      return <AdminDashboard />;
    default:
      return <p>Invalid role</p>;
  }
};
