'use client';

import { useState } from 'react';
import { Modal, Button, Card, Switch, Space, Typography } from 'antd';
import { 
  DashboardOutlined, 
  TeamOutlined,
  EyeOutlined 
} from '@ant-design/icons';
import { ProtectedComponent } from '@/components/auth/ProtectedRoute';
import { useAuthStore } from '@/stores/authStore';
import UserList from './UserList';
import UserForm from './UserForm';
import DriverDashboard from '@/components/driver/DriverDashboard';
import StudentCheckIn from '@/components/driver/StudentCheckIn';
import { USER_ROLES } from '@/constants/app';
import type { User, Trip } from '@/types/api';

const { Title } = Typography;

interface DriversTabProps {
  driverView?: boolean; // If true, show driver-specific view
}

export default function DriversTab({ driverView = false }: DriversTabProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [showDashboard, setShowDashboard] = useState(driverView);
  const [selectedTrip, setSelectedTrip] = useState<Trip | undefined>(undefined);
  const [showStudentCheckIn, setShowStudentCheckIn] = useState(false);
  
  const { user } = useAuthStore();
  const isDriver = user?.role === USER_ROLES.DRIVER;

  const handleAdd = () => {
    setEditingUser(undefined);
    setIsModalVisible(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingUser(undefined);
  };

  const handleSuccess = () => {
    setIsModalVisible(false);
    setEditingUser(undefined);
  };

  const handleViewTrip = (trip: Trip) => {
    setSelectedTrip(trip);
    // Could add trip details modal here
  };

  const handleManageStudents = (trip: Trip) => {
    setSelectedTrip(trip);
    setShowStudentCheckIn(true);
  };

  const handleBackToDashboard = () => {
    setShowStudentCheckIn(false);
    setSelectedTrip(undefined);
  };

  // Driver-specific view (for when user is a driver)
  if (driverView || (isDriver && showDashboard)) {
    if (showStudentCheckIn && selectedTrip) {
      return (
        <StudentCheckIn 
          trip={selectedTrip} 
          onBack={handleBackToDashboard} 
        />
      );
    }

    return (
      <DriverDashboard 
        onViewTrip={handleViewTrip}
        onManageStudents={handleManageStudents}
      />
    );
  }

  // Admin view for managing drivers
  return (
    <ProtectedComponent roles={[USER_ROLES.ADMIN]}>
      <Card style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Title level={4} style={{ margin: 0 }}>
              Drivers Management
            </Title>
            <p style={{ margin: 0, color: '#666' }}>
              Manage driver accounts and access driver dashboard
            </p>
          </div>
          
          <Space>
            <span>View Mode:</span>
            <Switch
              checked={showDashboard}
              onChange={setShowDashboard}
              checkedChildren={<><DashboardOutlined /> Dashboard</>}
              unCheckedChildren={<><TeamOutlined /> Management</>}
            />
          </Space>
        </div>
      </Card>

      {showDashboard ? (
        <Card>
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <DashboardOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={3}>Driver Dashboard Preview</Title>
            <p style={{ color: '#666', marginBottom: '24px' }}>
              This is how the dashboard appears to drivers. To see the full functionality, 
              you would need to log in as a driver account.
            </p>
            <Button type="primary" icon={<EyeOutlined />}>
              Switch to Driver Account
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <UserList 
            onAdd={handleAdd} 
            onEdit={handleEdit} 
            roleFilter={USER_ROLES.DRIVER}
            title="Drivers Management"
            addButtonText="Add Driver"
          />
          
          <Modal
            title={editingUser ? 'Edit Driver' : 'Add New Driver'}
            open={isModalVisible}
            onCancel={handleModalClose}
            footer={null}
            width={900}
            destroyOnClose
          >
            <UserForm 
              user={editingUser}
              onSuccess={handleSuccess}
              onCancel={handleModalClose}
              defaultRole={USER_ROLES.DRIVER}
              roleDisabled={!editingUser} // Only allow changing role when editing
            />
          </Modal>
        </>
      )}
    </ProtectedComponent>
  );
}