'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Alert } from 'antd';
import SystemAdminDashboard from '@/components/admin/SystemAdminDashboard';
import { useAuthStore } from '@/stores/authStore';

export default function AdminDashboardPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Redirect non-admin users
    if (user && user.role !== 'ADMIN') {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (!user) {
    return (
      <Card style={{ textAlign: 'center', padding: '50px' }}>
        <Alert 
          message="Access Denied" 
          description="Please log in to access the admin dashboard." 
          type="error" 
        />
      </Card>
    );
  }

  if (user.role !== 'ADMIN') {
    return (
      <Card style={{ textAlign: 'center', padding: '50px' }}>
        <Alert 
          message="Access Denied" 
          description="This dashboard is only available for administrator accounts." 
          type="error" 
        />
      </Card>
    );
  }

  return <SystemAdminDashboard adminId={user.id} />;
}