'use client';

import { useState } from 'react';
import { Tabs, Badge } from 'antd';
import {
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  CarOutlined,
  HeartOutlined,
} from '@ant-design/icons';
import { useAuthStore } from '@/stores/authStore';
import { USER_ROLES } from '@/constants/app';
import AllUsersTab from './AllUsersTab';
import StudentsTab from './StudentsTab';
import TeachersTab from './TeachersTab';
import DriversTab from './DriversTab';
import ParentsTab from './ParentsTab';

const { TabPane } = Tabs;

export default function UserTabs() {
  const [activeTab, setActiveTab] = useState('all');
  const { user } = useAuthStore();

  // Check if user has permission to access different tabs
  const canAccessAll = user?.role === USER_ROLES.ADMIN;
  const canAccessStudents = [USER_ROLES.ADMIN, USER_ROLES.TEACHER];
  const canAccessTeachers = user?.role === USER_ROLES.ADMIN;
  const canAccessDrivers = user?.role === USER_ROLES.ADMIN;
  const canAccessParents = [USER_ROLES.ADMIN, USER_ROLES.TEACHER];

  // If user is a driver, show driver-specific view
  if (user?.role === USER_ROLES.DRIVER) {
    return <DriversTab driverView={true} />;
  }

  const tabs = [
    {
      key: 'all',
      label: (
        <span>
          <TeamOutlined />
          All Users
        </span>
      ),
      children: <AllUsersTab />,
      show: canAccessAll,
    },
    {
      key: 'students',
      label: (
        <span>
          <BookOutlined />
          Students
        </span>
      ),
      children: <StudentsTab />,
      show: canAccessStudents,
    },
    {
      key: 'teachers',
      label: (
        <span>
          <UserOutlined />
          Teachers
        </span>
      ),
      children: <TeachersTab />,
      show: canAccessTeachers,
    },
    {
      key: 'drivers',
      label: (
        <span>
          <CarOutlined />
          Drivers
        </span>
      ),
      children: <DriversTab />,
      show: canAccessDrivers,
    },
    {
      key: 'parents',
      label: (
        <span>
          <HeartOutlined />
          Parents & Guardians
        </span>
      ),
      children: <ParentsTab />,
      show: canAccessParents,
    },
  ];

  const visibleTabs = tabs.filter((tab) => tab.show);

  // If only one tab is visible, show it directly without tabs
  if (visibleTabs.length === 1) {
    return visibleTabs[0].children;
  }

  return (
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      type="card"
      size="large"
    >
      {visibleTabs.map((tab) => (
        <TabPane key={tab.key} tab={tab.label}>
          {tab.children}
        </TabPane>
      ))}
    </Tabs>
  );
}
