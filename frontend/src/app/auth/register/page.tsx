'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/constants/app';
import RegisterForm from '@/components/auth/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, router]);

  const handleSwitchToLogin = () => {
    router.push('/auth/login');
  };

  // Don't render if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <RegisterForm onSwitchToLogin={handleSwitchToLogin} />
  );
}