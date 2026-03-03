'use client';

import { useState } from 'react';
import { Modal } from 'antd';
import { ProtectedComponent } from '@/components/auth/ProtectedRoute';
import UserList from './UserList';
import UserForm from './UserForm';
import { USER_ROLES } from '@/constants/app';
import type { User } from '@/types/api';

export default function TeachersTab() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);

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

  return (
    <ProtectedComponent roles={[USER_ROLES.ADMIN]}>
      <UserList 
        onAdd={handleAdd} 
        onEdit={handleEdit} 
        roleFilter={USER_ROLES.TEACHER}
        title="Teachers Management"
        addButtonText="Add Teacher"
      />
      
      <Modal
        title={editingUser ? 'Edit Teacher' : 'Add New Teacher'}
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
          defaultRole={USER_ROLES.TEACHER}
          roleDisabled={!editingUser} // Only allow changing role when editing
        />
      </Modal>
    </ProtectedComponent>
  );
}