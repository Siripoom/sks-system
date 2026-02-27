'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/constants/app';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Redirect to dashboard if already authenticated
    if (isAuthenticated) {
      router.push(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, router]);

  const handleSwitchToRegister = () => {
    router.push('/auth/register');
  };

  // Don't render if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <LoginForm onSwitchToRegister={handleSwitchToRegister} />
  );
}