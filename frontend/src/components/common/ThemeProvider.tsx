'use client';

import { ConfigProvider, App, theme } from 'antd';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, ReactNode } from 'react';
import enUS from 'antd/locale/en_US';
import { lightTheme, darkTheme } from '@/styles/theme';
import { STORAGE_KEYS } from '@/constants/app';
import PWAProvider from './PWAProvider';

// Configure Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
      retry: (failureCount, error: any) => {
        // Don't retry on authentication errors
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

interface ThemeProviderProps {
  children: ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize theme from localStorage or default to light
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
      return savedTheme === 'dark';
    }
    return false;
  });

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.THEME, newTheme ? 'dark' : 'light');
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={isDarkMode ? darkTheme : lightTheme}
        locale={enUS}
        componentSize="middle"
      >
        <App>
          <PWAProvider />
          <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
            {children}
          </div>
        </App>
      </ConfigProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}