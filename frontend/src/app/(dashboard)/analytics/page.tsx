'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Alert } from 'antd';
import AdvancedAnalyticsDashboard from '@/components/analytics/AdvancedAnalyticsDashboard';
import { useAuthStore } from '@/stores/authStore';

export default function AnalyticsPage() {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // Only allow ADMIN and TEACHER roles to access analytics
    if (user && !['ADMIN', 'TEACHER'].includes(user.role)) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (!user) {
    return (
      <Card style={{ textAlign: 'center', padding: '50px' }}>
        <Alert 
          message="Access Denied" 
          description="Please log in to access the analytics dashboard." 
          type="error" 
        />
      </Card>
    );
  }

  if (!['ADMIN', 'TEACHER'].includes(user.role)) {
    return (
      <Card style={{ textAlign: 'center', padding: '50px' }}>
        <Alert 
          message="Access Denied" 
          description="This dashboard is only available for administrators and teachers." 
          type="error" 
        />
      </Card>
    );
  }

  return <AdvancedAnalyticsDashboard />;
}