'use client';

import {
  Layout,
  Button,
  Avatar,
  Dropdown,
  Badge,
  Space,
  Input,
  Typography,
  Breadcrumb,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  SunOutlined,
  MoonOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import { useAppStore } from '@/stores/appStore';
import { formatFullName, getInitials } from '@/utils/format';
import { ROUTES } from '@/constants/app';
import { useRouter } from 'next/navigation';
import type { MenuProps } from 'antd';

const { Header } = Layout;
const { Search } = Input;
const { Text } = Typography;

interface AppHeaderProps {
  collapsed: boolean;
  onToggle: () => void;
  theme: 'light' | 'dark';
  onThemeChange: () => void;
}

export default function AppHeader({
  collapsed,
  onToggle,
  theme,
  onThemeChange,
}: AppHeaderProps) {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const {
    notifications,
    unreadCount,
    breadcrumbs,
    searchVisible,
    setSearchVisible,
    setSearchQuery,
  } = useAppStore();

  // User dropdown menu
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => router.push(ROUTES.PROFILE),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
      onClick: () => router.push(ROUTES.SETTINGS),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  // Notification dropdown menu
  const notificationMenuItems: MenuProps['items'] = [
    ...notifications.slice(0, 5).map((notification) => ({
      key: notification.id,
      label: (
        <div className="notification-item">
          <div className="notification-title">{notification.title}</div>
          <div className="notification-message">{notification.message}</div>
          <div className="notification-time">
            {notification.timestamp.toLocaleTimeString()}
          </div>
        </div>
      ),
    })),
    ...(notifications.length > 0
      ? [
          {
            type: 'divider' as const,
          },
          {
            key: 'view-all',
            label: 'View All Notifications',
            onClick: () => router.push('/notifications'),
          },
        ]
      : []),
    ...(notifications.length === 0
      ? [
          {
            key: 'no-notifications',
            label: 'No new notifications',
            disabled: true,
          },
        ]
      : []),
  ];

  async function handleLogout() {
    try {
      await logout();
      router.push(ROUTES.LOGIN);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    // Implement global search functionality here
    console.log('Searching for:', value);
  };

  return (
    <Header
      style={{
        padding: 0,
        background: theme === 'light' ? '#fff' : '#1f1f1f',
        borderBottom: `1px solid ${theme === 'light' ? '#f0f0f0' : '#303030'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Left section */}
      <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={onToggle}
          style={{
            fontSize: '16px',
            width: 64,
            height: 64,
          }}
        />

        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <Breadcrumb style={{ margin: '0 16px' }}>
            {breadcrumbs.map((item, index) => (
              <Breadcrumb.Item key={index} href={item.path}>
                {item.title}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}
      </div>

      {/* Right section */}
      <Space size="middle" style={{ marginRight: 24 }}>
        {/* Search */}
        {searchVisible ? (
          <Search
            placeholder="Search..."
            style={{ width: 200 }}
            onSearch={handleSearch}
            onBlur={() => setSearchVisible(false)}
            autoFocus
          />
        ) : (
          <Button
            type="text"
            icon={<SearchOutlined />}
            onClick={() => setSearchVisible(true)}
          />
        )}

        {/* Notifications */}
        <Dropdown
          menu={{ items: notificationMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Button
            type="text"
            icon={
              <Badge count={unreadCount} size="small">
                <BellOutlined />
              </Badge>
            }
          />
        </Dropdown>

        {/* User menu */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '0 8px',
            }}
          >
            <Avatar
              size="small"
              icon={<UserOutlined />}
              style={{ marginRight: 8 }}
            >
              {user ? getInitials(user.firstName, user.lastName) : 'U'}
            </Avatar>
            <Space direction="vertical" size={0}>
              <Text type="secondary" style={{ fontSize: '11px' }}>
                {user?.role || 'Unknown'}
              </Text>
            </Space>
          </div>
        </Dropdown>
      </Space>
    </Header>
  );
}
