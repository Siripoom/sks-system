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
  Select,
  Steps,
  Row,
  Col,
} from 'antd';
import { 
  UserOutlined, 
  MailOutlined,
  LockOutlined, 
  PhoneOutlined,
  EyeInvisibleOutlined, 
  EyeTwoTone,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import { ROUTES, SUCCESS_MESSAGES, USER_ROLES } from '@/constants/app';
import { customValidations } from '@/utils/validation';
import type { RegisterData } from '@/types/api';

const { Title, Text, Link } = Typography;
const { Option } = Select;

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const router = useRouter();
  const { register, isLoading, error, clearError } = useAuthStore();
  const { addNotification } = useAppStore();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [password, setPassword] = useState('');

  const steps = [
    {
      title: 'Basic Info',
      icon: <UserOutlined />,
    },
    {
      title: 'Account Setup',
      icon: <SafetyCertificateOutlined />,
    },
  ];

  const roleOptions = [
    {
      value: USER_ROLES.TEACHER,
      label: 'Teacher',
      description: 'Manage students and school operations',
    },
    {
      value: USER_ROLES.DRIVER,
      label: 'Driver',
      description: 'Operate vehicles and manage trips',
    },
    {
      value: USER_ROLES.PARENT,
      label: 'Parent',
      description: 'Track children and receive notifications',
    },
  ];

  const handleSubmit = async (values: RegisterData) => {
    try {
      clearError();
      await register(values);
      
      addNotification({
        type: 'success',
        title: 'Welcome!',
        message: 'Account created successfully',
      });
      
      router.push(ROUTES.DASHBOARD);
    } catch (error: any) {
      // Error is already handled by the store
      console.error('Registration failed:', error);
    }
  };

  const nextStep = async () => {
    try {
      const values = await form.validateFields();
      if (currentStep === 0) {
        // Validate first step fields
        const { firstName, lastName, phone } = values;
        if (firstName && lastName && phone) {
          setCurrentStep(1);
        }
      }
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="firstName"
                  label="First Name"
                  rules={[
                    { required: true, message: 'First name is required' },
                    { min: 2, message: 'Name must be at least 2 characters long' },
                    { max: 50, message: 'Name must not exceed 50 characters' }
                  ]}
                >
                  <Input placeholder="John" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="lastName"
                  label="Last Name"
                  rules={[
                    { required: true, message: 'Last name is required' },
                    { min: 2, message: 'Name must be at least 2 characters long' },
                    { max: 50, message: 'Name must not exceed 50 characters' }
                  ]}
                >
                  <Input placeholder="Doe" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: 'Phone number is required' },
                { pattern: /^[+]?[\d\s\-\(\)]+$/, message: 'Please enter a valid phone number' }
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="+1 234 567 8900"
              />
            </Form.Item>

            <Form.Item
              name="role"
              label="Account Type"
              rules={[{ required: true, message: 'Account type is required' }]}
            >
              <Select placeholder="Select your role" size="large">
                {roleOptions.map(role => (
                  <Option key={role.value} value={role.value}>
                    <div>
                      <div style={{ fontWeight: 500 }}>{role.label}</div>
                      <div style={{ 
                        fontSize: '12px', 
                        color: '#666',
                        marginTop: '2px' 
                      }}>
                        {role.description}
                      </div>
                    </div>
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </>
        );

      case 1:
        return (
          <>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                { required: true, message: 'Email is required' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="your.email@example.com"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Password is required' },
                { min: 8, message: 'Password must be at least 8 characters long' }
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Create a strong password"
                autoComplete="new-password"
                iconRender={(visible) => 
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Password confirmation is required' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match'));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm your password"
                autoComplete="new-password"
                iconRender={(visible) => 
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
          </>
        );

      default:
        return null;
    }
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
          maxWidth: 500,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
        }}
        bodyStyle={{ padding: '40px' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
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
              Join SKS Transport
            </Title>
            <Text type="secondary">
              Create your account to get started
            </Text>
          </div>

          {/* Progress Steps */}
          <Steps 
            current={currentStep} 
            size="small"
            items={steps.map(step => ({
              title: step.title,
              icon: step.icon
            }))}
          />

          {/* Error Alert */}
          {error && (
            <Alert
              message="Registration Failed"
              description={error}
              type="error"
              showIcon
              closable
              onClose={clearError}
            />
          )}

          {/* Registration Form */}
          <Form
            form={form}
            name="register"
            onFinish={handleSubmit}
            autoComplete="off"
            size="large"
            layout="vertical"
          >
            {renderStepContent()}

            {/* Form Actions */}
            <Form.Item style={{ marginTop: '24px' }}>
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                {currentStep > 0 && (
                  <Button onClick={prevStep}>
                    Previous
                  </Button>
                )}
                
                <div style={{ marginLeft: 'auto' }}>
                  {currentStep < steps.length - 1 ? (
                    <Button type="primary" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={isLoading}
                      style={{ minWidth: '120px' }}
                    >
                      Create Account
                    </Button>
                  )}
                </div>
              </Space>
            </Form.Item>
          </Form>

          {/* Switch to Login */}
          {onSwitchToLogin && (
            <>
              <Divider>or</Divider>
              
              <div style={{ textAlign: 'center' }}>
                <Text type="secondary">
                  Already have an account?{' '}
                  <Link onClick={onSwitchToLogin}>
                    Sign in here
                  </Link>
                </Text>
              </div>
            </>
          )}

          {/* Terms and Privacy */}
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              By creating an account, you agree to our{' '}
              <Link>Terms of Service</Link> and{' '}
              <Link>Privacy Policy</Link>
            </Text>
          </div>
        </Space>
      </Card>
    </div>
  );
}