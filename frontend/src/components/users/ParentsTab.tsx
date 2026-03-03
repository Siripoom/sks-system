'use client';

import { useState } from 'react';
import { Modal, Tabs, Card, Typography } from 'antd';
import { UserOutlined, HeartOutlined } from '@ant-design/icons';
import { ProtectedComponent } from '@/components/auth/ProtectedRoute';
import UserList from './UserList';
import UserForm from './UserForm';
import GuardianList from '@/components/guardians/GuardianList';
import GuardianForm from '@/components/guardians/GuardianForm';
import { USER_ROLES } from '@/constants/app';
import type { User, Guardian } from '@/types/api';

const { Title } = Typography;
const { TabPane } = Tabs;

export default function ParentsTab() {
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [isGuardianModalVisible, setIsGuardianModalVisible] = useState(false);
  const [selectedGuardian, setSelectedGuardian] = useState<Guardian | undefined>(undefined);
  const [isViewMode, setIsViewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('parent-users');

  // Parent User Handlers
  const handleUserAdd = () => {
    setEditingUser(undefined);
    setIsUserModalVisible(true);
  };

  const handleUserEdit = (user: User) => {
    setEditingUser(user);
    setIsUserModalVisible(true);
  };

  const handleUserModalClose = () => {
    setIsUserModalVisible(false);
    setEditingUser(undefined);
  };

  const handleUserSuccess = () => {
    setIsUserModalVisible(false);
    setEditingUser(undefined);
  };

  // Guardian Handlers
  const handleGuardianAdd = () => {
    setSelectedGuardian(undefined);
    setIsViewMode(false);
    setIsGuardianModalVisible(true);
  };

  const handleGuardianEdit = (guardian: Guardian) => {
    setSelectedGuardian(guardian);
    setIsViewMode(false);
    setIsGuardianModalVisible(true);
  };

  const handleGuardianViewDetails = (guardian: Guardian) => {
    setSelectedGuardian(guardian);
    setIsViewMode(true);
    setIsGuardianModalVisible(true);
  };

  const handleGuardianModalClose = () => {
    setIsGuardianModalVisible(false);
    setSelectedGuardian(undefined);
    setIsViewMode(false);
  };

  const handleGuardianSuccess = () => {
    handleGuardianModalClose();
  };

  return (
    <ProtectedComponent roles={[USER_ROLES.ADMIN, USER_ROLES.TEACHER]}>
      <Card style={{ marginBottom: '16px' }}>
        <Title level={4} style={{ margin: 0 }}>
          Parents & Guardians Management
        </Title>
        <p style={{ margin: 0, color: '#666' }}>
          Manage parent user accounts and guardian profiles with student relationships
        </p>
      </Card>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={[
          {
            key: 'parent-users',
            label: (
              <span>
                <UserOutlined />
                Parent User Accounts
              </span>
            ),
            children: (
              <>
                <UserList 
                  onAdd={handleUserAdd} 
                  onEdit={handleUserEdit} 
                  roleFilter={USER_ROLES.PARENT}
                  title="Parent User Accounts"
                  addButtonText="Add Parent User"
                />
              </>
            ),
          },
          {
            key: 'guardians',
            label: (
              <span>
                <HeartOutlined />
                Guardian Profiles
              </span>
            ),
            children: (
              <>
                <GuardianList 
                  onAdd={handleGuardianAdd}
                  onEdit={handleGuardianEdit}
                  onViewDetails={handleGuardianViewDetails}
                />
              </>
            ),
          },
        ]}
      />
      
      {/* Parent User Modal */}
      <Modal
        title={editingUser ? 'Edit Parent User' : 'Add New Parent User'}
        open={isUserModalVisible}
        onCancel={handleUserModalClose}
        footer={null}
        width={900}
        destroyOnClose
      >
        <UserForm 
          user={editingUser}
          onSuccess={handleUserSuccess}
          onCancel={handleUserModalClose}
          defaultRole={USER_ROLES.PARENT}
          roleDisabled={!editingUser} // Only allow changing role when editing
        />
      </Modal>

      {/* Guardian Modal */}
      <Modal
        title={
          isViewMode 
            ? `Guardian Details - ${selectedGuardian ? `${selectedGuardian.firstName} ${selectedGuardian.lastName}` : ''}`
            : selectedGuardian 
              ? 'Edit Guardian' 
              : 'Add New Guardian'
        }
        open={isGuardianModalVisible}
        onCancel={handleGuardianModalClose}
        footer={null}
        width={800}
        destroyOnClose
      >
        {isViewMode ? (
          <div>
            {/* Guardian details view would go here */}
            <p>Guardian details view component coming soon...</p>
          </div>
        ) : (
          <GuardianForm
            guardian={selectedGuardian}
            onSuccess={handleGuardianSuccess}
            onCancel={handleGuardianModalClose}
          />
        )}
      </Modal>
    </ProtectedComponent>
  );
}