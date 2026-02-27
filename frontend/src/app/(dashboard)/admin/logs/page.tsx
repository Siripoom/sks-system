'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Alert } from 'antd';
import SystemLogsViewer from '@/components/admin/SystemLogsViewer';
import { useAuthStore } from '@/stores/authStore';

export default function AdminLogsPage() {
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
          description="Please log in to access the logs viewer." 
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
          description="This page is only available for administrator accounts." 
          type="error" 
        />
      </Card>
    );
  }

  return <SystemLogsViewer />;
}