'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Alert } from 'antd';
import StudentTrackingDashboard from '@/components/parent/StudentTrackingDashboard';
import { useAuthStore } from '@/stores/authStore';

export default function ParentPortalPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Redirect non-parent users
    if (user && user.role !== 'PARENT') {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (!user) {
    return (
      <Card style={{ textAlign: 'center', padding: '50px' }}>
        <Alert 
          message="Access Denied" 
          description="Please log in to access the parent portal." 
          type="error" 
        />
      </Card>
    );
  }

  if (user.role !== 'PARENT') {
    return (
      <Card style={{ textAlign: 'center', padding: '50px' }}>
        <Alert 
          message="Access Denied" 
          description="This portal is only available for parent accounts." 
          type="error" 
        />
      </Card>
    );
  }

  return <StudentTrackingDashboard />;
}