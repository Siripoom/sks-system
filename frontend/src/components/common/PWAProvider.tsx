'use client';

import { useEffect, useState } from 'react';
import { Button, notification } from 'antd';
import { DownloadOutlined, ReloadOutlined } from '@ant-design/icons';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAProvider() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
          
          // Check for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available
                  notification.info({
                    message: 'Update Available',
                    description: 'A new version is available. Please refresh to update.',
                    btn: (
                      <Button 
                        type="primary" 
                        size="small" 
                        icon={<ReloadOutlined />}
                        onClick={() => {
                          window.location.reload();
                          notification.destroy();
                        }}
                      >
                        Refresh
                      </Button>
                    ),
                    duration: 0,
                    key: 'sw-update',
                  });
                }
              });
            }
          });
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Handle install prompt
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Show install notification
      notification.info({
        message: 'Install App',
        description: 'Install SKS Transportation System for a better experience',
        btn: (
          <Button 
            type="primary" 
            size="small" 
            icon={<DownloadOutlined />}
            onClick={handleInstallClick}
          >
            Install
          </Button>
        ),
        duration: 10,
        key: 'install-prompt',
      });
    };

    // Check if already installed
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      notification.destroy('install-prompt');
      
      notification.success({
        message: 'App Installed',
        description: 'SKS Transportation System has been installed successfully!',
        duration: 3,
      });
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled as EventListener);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled as EventListener);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    setDeferredPrompt(null);
    notification.destroy('install-prompt');
  };

  // Online/Offline status
  useEffect(() => {
    const handleOnline = () => {
      notification.success({
        message: 'Connection Restored',
        description: 'You are back online!',
        duration: 3,
        key: 'online-status',
      });
    };

    const handleOffline = () => {
      notification.warning({
        message: 'You are Offline',
        description: 'Some features may be limited while offline.',
        duration: 5,
        key: 'offline-status',
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return null;
}