'use client';

import { useEffect, useState } from 'react';
import { Card, Button, Typography, Space, Alert, Spin } from 'antd';
import { WifiOutlined, ReloadOutlined, HomeOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Title, Text } = Typography;

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    // Check initial status
    setIsOnline(navigator.onLine);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const checkConnection = async () => {
    setIsChecking(true);
    
    try {
      await fetch('/api/health', { method: 'HEAD' });
      setIsOnline(true);
      // Redirect to home when connection is restored
      router.push('/');
    } catch (error) {
      setIsOnline(false);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: '#f0f2f5',
      padding: '20px'
    }}>
      <Card
        style={{ 
          maxWidth: 500, 
          textAlign: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div style={{ fontSize: '64px', color: '#bfbfbf' }}>
            <WifiOutlined />
          </div>
          
          <div>
            <Title level={2} style={{ color: '#595959', margin: 0 }}>
              You're Offline
            </Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>
              Please check your internet connection and try again
            </Text>
          </div>

          {isOnline ? (
            <Alert
              message="Connection Restored!"
              description="Your internet connection has been restored. You can now use all features."
              type="success"
              showIcon
              action={
                <Button type="primary" onClick={() => router.push('/')}>
                  <HomeOutlined /> Return to App
                </Button>
              }
            />
          ) : (
            <Alert
              message="Limited Functionality"
              description="While offline, you can still view previously loaded data, but real-time features won't work."
              type="warning"
              showIcon
            />
          )}

          <Space>
            <Button 
              type="primary" 
              icon={isChecking ? <Spin size="small" /> : <ReloadOutlined />}
              onClick={checkConnection}
              loading={isChecking}
            >
              Try Again
            </Button>
            
            <Button onClick={() => router.back()}>
              Go Back
            </Button>
          </Space>

          <div style={{ marginTop: '24px', padding: '16px', backgroundColor: '#fafafa', borderRadius: '8px' }}>
            <Title level={4} style={{ margin: '0 0 12px 0', color: '#595959' }}>
              What you can do offline:
            </Title>
            <ul style={{ textAlign: 'left', margin: 0, paddingLeft: '20px' }}>
              <li>View previously loaded student information</li>
              <li>Check cached trip schedules</li>
              <li>Browse school directory</li>
              <li>Access emergency contact information</li>
            </ul>
          </div>
        </Space>
      </Card>
    </div>
  );
}