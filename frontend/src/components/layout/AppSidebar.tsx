'use client';

import { Layout, Menu, Typography, Space } from 'antd';
import {
  DashboardOutlined,
  BankOutlined,
  CarOutlined,
  UserOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  ScheduleOutlined,
  LinkOutlined,
  SafetyCertificateOutlined,
  HeartOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES, USER_ROLES } from '@/constants/app';
import type { MenuItem } from '@/types/common';
import { ReactNode } from 'react';

const { Sider } = Layout;
const { Title } = Typography;

interface AppSidebarProps {
  collapsed: boolean;
  theme: 'light' | 'dark';
}

// Menu items configuration with role-based access
const menuItems: MenuItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: <DashboardOutlined />,
    path: ROUTES.DASHBOARD,
  },
  {
    key: 'schools',
    label: 'Schools',
    icon: <BankOutlined />,
    path: ROUTES.SCHOOLS,
    roles: [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  },
  {
    key: 'vehicles',
    label: 'Vehicles',
    icon: <CarOutlined />,
    path: ROUTES.VEHICLES,
    roles: [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  },
  {
    key: 'users',
    label: 'Users',
    icon: <UserOutlined />,
    path: ROUTES.USERS,
    roles: [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  },
  {
    key: 'students',
    label: 'Students',
    icon: <TeamOutlined />,
    path: ROUTES.STUDENTS,
    roles: [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  },
  {
    key: 'drivers',
    label: 'Drivers',
    icon: <SafetyCertificateOutlined />,
    path: ROUTES.DRIVERS,
    roles: [USER_ROLES.ADMIN],
  },
  {
    key: 'routes',
    label: 'Routes',
    icon: <EnvironmentOutlined />,
    path: ROUTES.ROUTES,
  },
  {
    key: 'trips',
    label: 'Trips',
    icon: <ScheduleOutlined />,
    path: ROUTES.TRIPS,
  },
  {
    key: 'my-trips',
    label: 'My Trips',
    icon: <ScheduleOutlined />,
    path: '/my-trips',
    roles: [USER_ROLES.DRIVER],
  },
  {
    key: 'my-children',
    label: 'My Children',
    icon: <HeartOutlined />,
    path: '/my-children',
    roles: [USER_ROLES.PARENT],
  },
  {
    key: 'assignments',
    label: 'Assignments',
    icon: <LinkOutlined />,
    path: ROUTES.ASSIGNMENTS,
    roles: [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  },
  {
    key: 'guardians',
    label: 'Guardians',
    icon: <HeartOutlined />,
    path: ROUTES.GUARDIANS,
    roles: [USER_ROLES.ADMIN, USER_ROLES.TEACHER],
  },
  {
    key: 'event-logs',
    label: 'Event Logs',
    icon: <HistoryOutlined />,
    path: ROUTES.EVENT_LOGS,
    roles: [USER_ROLES.ADMIN],
  },
];

export default function AppSidebar({ collapsed, theme }: AppSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, hasAnyRole } = useAuthStore();

  // Filter menu items based on user role
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.roles || item.roles.length === 0) return true;
    return user && hasAnyRole(item.roles);
  });

  // Convert to Ant Design menu items format
  const antMenuItems = filteredMenuItems.map(item => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    onClick: () => {
      if (item.path) {
        router.push(item.path);
      }
    },
  }));

  // Get current selected key based on pathname
  const getSelectedKey = () => {
    const currentItem = menuItems.find(item => item.path === pathname);
    return currentItem ? [currentItem.key] : ['dashboard'];
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="dark"
      width={256}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      {/* Logo and Title */}
      <div style={{ 
        height: 64, 
        margin: 16, 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }}>
        <Space>
          <CarOutlined style={{ 
            fontSize: '24px', 
            color: '#1890ff',
          }} />
          {!collapsed && (
            <Title 
              level={4} 
              style={{ 
                color: '#ffffff', 
                margin: 0,
                fontSize: '16px',
              }}
            >
              SKS Transport
            </Title>
          )}
        </Space>
      </div>

      {/* Navigation Menu */}
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKey()}
        items={antMenuItems}
        style={{ borderRight: 0 }}
      />

      {/* Footer info */}
      {!collapsed && (
        <div style={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          textAlign: 'center',
          color: 'rgba(255, 255, 255, 0.45)',
          fontSize: '12px',
        }}>
          <div>SKS Transportation</div>
          <div>Management System</div>
          <div style={{ marginTop: 4 }}>v1.0.0</div>
        </div>
      )}
    </Sider>
  );
}