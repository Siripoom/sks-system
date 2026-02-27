'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Result, Button, Spin } from 'antd';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/constants/app';

interface ProtectedRouteProps {
  children: ReactNode;
  roles?: string[];
  requireAuth?: boolean;
  fallback?: ReactNode;
}

export default function ProtectedRoute({ 
  children, 
  roles = [], 
  requireAuth = true,
  fallback
}: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize auth state on mount
    initializeAuth();
  }, [initializeAuth]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <Spin size="large" />
      </div>
    );
  }

  // Check if authentication is required
  if (requireAuth && !isAuthenticated) {
    router.push(ROUTES.LOGIN);
    return null;
  }

  // Check role-based access
  if (roles.length > 0 && user) {
    const hasAccess = roles.includes(user.role);
    
    if (!hasAccess) {
      return fallback || (
        <Result
          status="403"
          title="403"
          subTitle="Sorry, you are not authorized to access this page."
          extra={
            <Button type="primary" onClick={() => router.push(ROUTES.DASHBOARD)}>
              Back to Dashboard
            </Button>
          }
        />
      );
    }
  }

  return <>{children}</>;
}

// Higher-order component for page-level protection
export function withAuth<T extends {}>(
  WrappedComponent: React.ComponentType<T>,
  options: {
    roles?: string[];
    requireAuth?: boolean;
    redirectTo?: string;
  } = {}
) {
  const { roles = [], requireAuth = true, redirectTo = ROUTES.LOGIN } = options;

  return function AuthenticatedComponent(props: T) {
    return (
      <ProtectedRoute roles={roles} requireAuth={requireAuth}>
        <WrappedComponent {...props} />
      </ProtectedRoute>
    );
  };
}

// Component for protecting UI elements
interface ProtectedComponentProps {
  children: ReactNode;
  roles?: string[];
  fallback?: ReactNode;
  user?: any; // Override user for testing
}

export function ProtectedComponent({ 
  children, 
  roles = [], 
  fallback = null,
  user: overrideUser
}: ProtectedComponentProps) {
  const { user: storeUser } = useAuthStore();
  const user = overrideUser || storeUser;

  // If no roles specified, show to all authenticated users
  if (roles.length === 0) {
    return user ? <>{children}</> : <>{fallback}</>;
  }

  // Check if user has required role
  const hasAccess = user && roles.includes(user.role);

  return hasAccess ? <>{children}</> : <>{fallback}</>;
}

// Hook for checking permissions in components
export function usePermissions() {
  const { user, hasRole, hasAnyRole, canAccessResource } = useAuthStore();

  return {
    user,
    hasRole,
    hasAnyRole,
    canAccessResource,
    isAdmin: () => hasRole('ADMIN'),
    isTeacher: () => hasRole('TEACHER'),
    isDriver: () => hasRole('DRIVER'),
    isParent: () => hasRole('PARENT'),
    canManageSchools: () => hasAnyRole(['ADMIN', 'TEACHER']),
    canManageVehicles: () => hasAnyRole(['ADMIN', 'TEACHER']),
    canManageUsers: () => hasAnyRole(['ADMIN', 'TEACHER']),
    canManageDrivers: () => hasRole('ADMIN'),
    canViewReports: () => hasAnyRole(['ADMIN', 'TEACHER']),
    canAccessLogs: () => hasRole('ADMIN'),
  };
}