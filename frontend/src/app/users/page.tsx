'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/stores/appStore';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import { ProtectedComponent } from '@/components/auth/ProtectedRoute';
import UserTabs from '@/components/users/UserTabs';
import { USER_ROLES } from '@/constants/app';

function UsersContent() {
  const { setBreadcrumbs } = useAppStore();

  useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', path: '/dashboard' },
      { title: 'Users', path: '/users' }
    ]);
  }, [setBreadcrumbs]);

  return (
    <ProtectedComponent roles={[USER_ROLES.ADMIN, USER_ROLES.TEACHER, USER_ROLES.DRIVER]}>
      <UserTabs />
    </ProtectedComponent>
  );
}

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <UsersContent />
      </AppLayout>
    </ProtectedRoute>
  );
}