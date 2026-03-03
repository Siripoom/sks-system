'use client';

import { useState } from 'react';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Space, 
  Alert,
  Divider,
  Checkbox,
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined, 
  EyeInvisibleOutlined, 
  EyeTwoTone 
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import { ROUTES, SUCCESS_MESSAGES } from '@/constants/app';
import { ValidationRules } from '@/utils/validation';
import type { LoginCredentials } from '@/types/api';

const { Title, Text, Link } = Typography;

interface LoginFormProps {
  onSwitchToRegister?: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const { addNotification } = useAppStore();
  const [form] = Form.useForm();
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (values: LoginCredentials) => {
    try {
      clearError();
      await login(values);
      
      addNotification({
        type: 'success',
        title: 'Welcome Back!',
        message: SUCCESS_MESSAGES.LOGIN,
      });
      
      router.push(ROUTES.DASHBOARD);
    } catch (error: any) {
      // Error is already handled by the store
      console.error('Login failed:', error);
    }
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px',
    }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 400,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        }}
        styles={{ body: { padding: '40px' } }}
      >
        <Space orientation="vertical" size="large" style={{ width: '100%' }}>
          {/* Header */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ 
              fontSize: '48px', 
              color: '#1890ff', 
              marginBottom: '16px' 
            }}>
              🚌
            </div>
            <Title level={2} style={{ margin: '0 0 8px 0' }}>
              Welcome Back
            </Title>
            <Text type="secondary">
              Sign in to your SKS Transportation account
            </Text>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert
              message="Login Failed"
              description={error}
              type="error"
              showIcon
              closable
              onClose={clearError}
            />
          )}

          {/* Login Form */}
          <Form
            form={form}
            name="login"
            onFinish={handleSubmit}
            autoComplete="off"
            size="large"
            layout="vertical"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email address"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Password is required' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                autoComplete="current-password"
                iconRender={(visible) => 
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center' 
              }}>
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                >
                  Remember me
                </Checkbox>
                <Link onClick={handleForgotPassword}>
                  Forgot password?
                </Link>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isLoading}
                block
                style={{ height: 48 }}
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          {/* Switch to Register */}
          {onSwitchToRegister && (
            <>
              <Divider>or</Divider>
              
              <div style={{ textAlign: 'center' }}>
                <Text type="secondary">
                  Don't have an account?{' '}
                  <Link onClick={onSwitchToRegister}>
                    Sign up now
                  </Link>
                </Text>
              </div>
            </>
          )}

          {/* Demo Credentials (for development) */}
          {process.env.NODE_ENV === 'development' && (
            <div style={{ 
              background: '#f0f0f0', 
              padding: '12px', 
              borderRadius: '6px',
              fontSize: '12px',
            }}>
              <Text strong>Demo Credentials:</Text><br />
              <Text>Admin: admin@demo.com / password123</Text><br />
              <Text>Teacher: teacher@demo.com / password123</Text><br />
              <Text>Driver: driver@demo.com / password123</Text><br />
              <Text>Parent: parent@demo.com / password123</Text>
            </div>
          )}
        </Space>
      </Card>
    </div>
  );
}