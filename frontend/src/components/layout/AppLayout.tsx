'use client';

import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';

const { Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();
  const { 
    sidebarCollapsed, 
    toggleSidebar, 
    theme, 
    setTheme, 
    setIsMobile,
    globalLoading 
  } = useAppStore();

  const [mounted, setMounted] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobile(isMobile);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobile]);

  // Initialize authentication on mount
  useEffect(() => {
    initializeAuth();
    setMounted(true);
  }, [initializeAuth]);

  // Handle theme toggle
  const handleThemeChange = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  // Show loading spinner while initializing
  if (!mounted || isLoading) {
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <AppSidebar 
        collapsed={sidebarCollapsed} 
        theme={theme}
      />
      
      {/* Main Layout */}
      <Layout style={{ 
        marginLeft: sidebarCollapsed ? 80 : 256,
        transition: 'margin-left 0.2s',
      }}>
        {/* Header */}
        <AppHeader
          collapsed={sidebarCollapsed}
          onToggle={toggleSidebar}
          theme={theme}
          onThemeChange={handleThemeChange}
        />
        
        {/* Content */}
        <Content style={{
          margin: '24px 24px 0',
          overflow: 'initial',
          minHeight: 'calc(100vh - 64px - 24px)',
        }}>
          <Spin spinning={globalLoading}>
            <div style={{
              padding: 24,
              minHeight: 360,
              background: theme === 'light' ? '#fff' : '#1f1f1f',
              borderRadius: 8,
            }}>
              {children}
            </div>
          </Spin>
        </Content>
      </Layout>
    </Layout>
  );
}