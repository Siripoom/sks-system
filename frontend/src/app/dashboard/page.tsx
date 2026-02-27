'use client';

import { Card, Row, Col, Statistic, Typography, Space, Tag } from 'antd';
import {
  UserOutlined,
  CarOutlined,
  ScheduleOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AppLayout from '@/components/layout/AppLayout';
import { ProtectedComponent } from '@/components/auth/ProtectedRoute';
import { USER_ROLES } from '@/constants/app';
import { formatFullName } from '@/utils/format';
import { useEffect } from 'react';

const { Title, Paragraph } = Typography;

function DashboardContent() {
  const { user } = useAuthStore();
  const { setBreadcrumbs } = useAppStore();

  useEffect(() => {
    setBreadcrumbs([
      { title: 'Dashboard', path: '/dashboard' }
    ]);
  }, [setBreadcrumbs]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case USER_ROLES.ADMIN:
        return '#722ed1';
      case USER_ROLES.TEACHER:
        return '#1890ff';
      case USER_ROLES.DRIVER:
        return '#52c41a';
      case USER_ROLES.PARENT:
        return '#fa8c16';
      default:
        return '#d9d9d9';
    }
  };

  const getDashboardStats = () => {
    // This would normally come from API calls
    // For demo purposes, showing different stats based on role
    switch (user?.role) {
      case USER_ROLES.ADMIN:
        return [
          {
            title: 'Total Students',
            value: 1247,
            icon: <UserOutlined />,
            color: '#1890ff',
          },
          {
            title: 'Active Vehicles',
            value: 45,
            icon: <CarOutlined />,
            color: '#52c41a',
          },
          {
            title: 'Today\'s Trips',
            value: 128,
            icon: <ScheduleOutlined />,
            color: '#faad14',
          },
          {
            title: 'Active Drivers',
            value: 35,
            icon: <SafetyCertificateOutlined />,
            color: '#13c2c2',
          },
        ];
      case USER_ROLES.TEACHER:
        return [
          {
            title: 'My Students',
            value: 156,
            icon: <UserOutlined />,
            color: '#1890ff',
          },
          {
            title: 'Assigned Routes',
            value: 8,
            icon: <ScheduleOutlined />,
            color: '#52c41a',
          },
          {
            title: 'Pending Assignments',
            value: 12,
            icon: <WarningOutlined />,
            color: '#faad14',
          },
          {
            title: 'Completed Tasks',
            value: 89,
            icon: <TrophyOutlined />,
            color: '#722ed1',
          },
        ];
      case USER_ROLES.DRIVER:
        return [
          {
            title: 'Today\'s Routes',
            value: 6,
            icon: <ScheduleOutlined />,
            color: '#1890ff',
          },
          {
            title: 'Total Students',
            value: 48,
            icon: <UserOutlined />,
            color: '#52c41a',
          },
          {
            title: 'Completed Trips',
            value: 4,
            icon: <TrophyOutlined />,
            color: '#722ed1',
          },
          {
            title: 'Pending Trips',
            value: 2,
            icon: <WarningOutlined />,
            color: '#faad14',
          },
        ];
      case USER_ROLES.PARENT:
        return [
          {
            title: 'My Children',
            value: 2,
            icon: <UserOutlined />,
            color: '#1890ff',
          },
          {
            title: 'Active Routes',
            value: 2,
            icon: <ScheduleOutlined />,
            color: '#52c41a',
          },
          {
            title: 'This Week\'s Trips',
            value: 14,
            icon: <TrophyOutlined />,
            color: '#722ed1',
          },
          {
            title: 'Notifications',
            value: 3,
            icon: <WarningOutlined />,
            color: '#faad14',
          },
        ];
      default:
        return [];
    }
  };

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    let greeting = 'Good day';
    
    if (hour < 12) {
      greeting = 'Good morning';
    } else if (hour < 17) {
      greeting = 'Good afternoon';
    } else {
      greeting = 'Good evening';
    }
    
    return `${greeting}, ${user ? formatFullName(user.firstName, user.lastName) : 'User'}!`;
  };

  const stats = getDashboardStats();

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {/* Welcome Section */}
      <Card>
        <Space direction="vertical" size="small">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Title level={2} style={{ margin: 0 }}>
              {getWelcomeMessage()}
            </Title>
            <Tag color={getRoleColor(user?.role || '')} style={{ fontSize: '12px' }}>
              {user?.role}
            </Tag>
          </div>
          <Paragraph style={{ margin: 0, fontSize: '16px' }}>
            Welcome to the SKS Transportation Management System. Here's your overview for today.
          </Paragraph>
        </Space>
      </Card>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]}>
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={<span style={{ color: stat.color }}>{stat.icon}</span>}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* Role-specific Content */}
      <Row gutter={[16, 16]}>
        {/* Admin Dashboard */}
        <ProtectedComponent roles={[USER_ROLES.ADMIN]}>
          <Col span={24}>
            <Card title="System Overview" style={{ marginBottom: '16px' }}>
              <Paragraph>
                As an administrator, you have full access to manage schools, vehicles, 
                users, and system settings. Use the navigation menu to access different 
                modules and monitor the overall system health.
              </Paragraph>
            </Card>
          </Col>
        </ProtectedComponent>

        {/* Teacher Dashboard */}
        <ProtectedComponent roles={[USER_ROLES.TEACHER]}>
          <Col span={24}>
            <Card title="Teaching Dashboard" style={{ marginBottom: '16px' }}>
              <Paragraph>
                Welcome to your teaching dashboard. Here you can manage your students, 
                view route assignments, and coordinate with the transportation team 
                to ensure smooth operations.
              </Paragraph>
            </Card>
          </Col>
        </ProtectedComponent>

        {/* Driver Dashboard */}
        <ProtectedComponent roles={[USER_ROLES.DRIVER]}>
          <Col span={24}>
            <Card title="Driver Dashboard" style={{ marginBottom: '16px' }}>
              <Paragraph>
                Check your daily routes, update trip statuses, and manage your 
                assigned vehicle. Safety is our priority - please ensure all 
                pre-trip inspections are completed.
              </Paragraph>
            </Card>
          </Col>
        </ProtectedComponent>

        {/* Parent Dashboard */}
        <ProtectedComponent roles={[USER_ROLES.PARENT]}>
          <Col span={24}>
            <Card title="Parent Portal" style={{ marginBottom: '16px' }}>
              <Paragraph>
                Track your children's transportation, view schedules, and receive 
                real-time updates about bus locations and any changes to regular 
                routes or timings.
              </Paragraph>
            </Card>
          </Col>
        </ProtectedComponent>
      </Row>

      {/* Quick Actions */}
      <Card title="Quick Actions">
        <Row gutter={[16, 16]}>
          <ProtectedComponent roles={[USER_ROLES.ADMIN, USER_ROLES.TEACHER]}>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" hoverable>
                <div style={{ textAlign: 'center' }}>
                  <UserOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                  <div style={{ marginTop: '8px' }}>Manage Students</div>
                </div>
              </Card>
            </Col>
          </ProtectedComponent>

          <ProtectedComponent roles={[USER_ROLES.ADMIN, USER_ROLES.TEACHER]}>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" hoverable>
                <div style={{ textAlign: 'center' }}>
                  <CarOutlined style={{ fontSize: '24px', color: '#52c41a' }} />
                  <div style={{ marginTop: '8px' }}>Vehicle Status</div>
                </div>
              </Card>
            </Col>
          </ProtectedComponent>

          <Col xs={24} sm={12} md={6}>
            <Card size="small" hoverable>
              <div style={{ textAlign: 'center' }}>
                <ScheduleOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                <div style={{ marginTop: '8px' }}>View Schedule</div>
              </div>
            </Card>
          </Col>

          <ProtectedComponent roles={[USER_ROLES.DRIVER]}>
            <Col xs={24} sm={12} md={6}>
              <Card size="small" hoverable>
                <div style={{ textAlign: 'center' }}>
                  <SafetyCertificateOutlined style={{ fontSize: '24px', color: '#722ed1' }} />
                  <div style={{ marginTop: '8px' }}>Start Trip</div>
                </div>
              </Card>
            </Col>
          </ProtectedComponent>
        </Row>
      </Card>
    </Space>
  );
}

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <DashboardContent />
      </AppLayout>
    </ProtectedRoute>
  );
}